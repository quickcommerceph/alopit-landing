type AnalyticsProperties = Record<string, unknown>;

type QueuedEvent = {
  event: string;
  properties?: AnalyticsProperties;
};

type IdleCallback = (
  deadline: {
    didTimeout: boolean;
    timeRemaining: () => number;
  },
) => void;

type WindowWithIdleCallback = Window &
  typeof globalThis & {
    requestIdleCallback?: (callback: IdleCallback, options?: { timeout?: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

type PostHogClient = typeof import("posthog-js").default;

const queuedEvents: QueuedEvent[] = [];
let client: PostHogClient | null = null;
let loadPromise: Promise<PostHogClient | null> | null = null;
let disabled = false;
let scheduled = false;

function flushQueuedEvents(posthog: PostHogClient) {
  for (const { event, properties } of queuedEvents.splice(0)) {
    posthog.capture(event, properties);
  }
}

async function loadAnalytics() {
  if (typeof window === "undefined" || disabled) return null;
  if (client) return client;
  if (loadPromise) return loadPromise;

  const token = import.meta.env.VITE_POSTHOG_PROJECT_TOKEN;
  if (!token) {
    disabled = true;
    queuedEvents.length = 0;
    return null;
  }

  loadPromise = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(token, {
        api_host: import.meta.env.VITE_POSTHOG_HOST,
        defaults: "2026-05-30",
      });

      client = posthog;
      flushQueuedEvents(posthog);
      return posthog;
    })
    .catch(() => {
      disabled = true;
      queuedEvents.length = 0;
      return null;
    });

  return loadPromise;
}

export function initAnalytics() {
  if (typeof window === "undefined" || disabled || scheduled || client) {
    return () => {};
  }

  scheduled = true;
  const analyticsWindow = window as WindowWithIdleCallback;
  let cancelled = false;
  let cancelScheduledLoad = () => {};

  const load = () => {
    if (!cancelled) {
      void loadAnalytics();
    }
  };

  const scheduleIdleLoad = () => {
    if (cancelled || client || disabled) return;

    if (analyticsWindow.requestIdleCallback) {
      const idleId = analyticsWindow.requestIdleCallback(load, { timeout: 3500 });
      cancelScheduledLoad = () => {
        analyticsWindow.cancelIdleCallback?.(idleId);
      };
      return;
    }

    const timeoutId = window.setTimeout(load, 1200);
    cancelScheduledLoad = () => {
      window.clearTimeout(timeoutId);
    };
  };

  if (document.readyState === "complete") {
    scheduleIdleLoad();
  } else {
    window.addEventListener("load", scheduleIdleLoad, { once: true });
    cancelScheduledLoad = () => {
      window.removeEventListener("load", scheduleIdleLoad);
    };
  }

  return () => {
    cancelled = true;
    cancelScheduledLoad();
  };
}

export function capture(event: string, properties?: AnalyticsProperties) {
  if (disabled) return;

  if (client) {
    client.capture(event, properties);
    return;
  }

  queuedEvents.push({ event, properties });
  void loadAnalytics();
}
