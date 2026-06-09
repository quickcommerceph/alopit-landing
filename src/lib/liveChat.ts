export const LIVE_CHAT_DIRECT_URL = "https://www.livechat.com/chat-with/19491509/";

type IdleCallback = (
  deadline: {
    didTimeout: boolean;
    timeRemaining: () => number;
  },
) => void;

type LiveChatWidgetApi = {
  init?: () => void;
  call?: (method: string, params?: unknown) => void;
};

type WindowWithLiveChat = Window &
  typeof globalThis & {
    LiveChatWidget?: LiveChatWidgetApi;
    requestIdleCallback?: (callback: IdleCallback, options?: { timeout?: number }) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

let liveChatLoadStarted = false;

export function initLiveChat() {
  if (typeof window === "undefined" || liveChatLoadStarted) return;

  const liveChatWindow = window as WindowWithLiveChat;
  const widget = liveChatWindow.LiveChatWidget;
  if (!widget?.init) return;

  widget.init();
  liveChatLoadStarted = true;
}

export function openLiveChat() {
  if (typeof window === "undefined") return;

  const liveChatWindow = window as WindowWithLiveChat;
  initLiveChat();

  if (liveChatWindow.LiveChatWidget?.call) {
    liveChatWindow.LiveChatWidget.call("maximize");
    return;
  }

  window.open(LIVE_CHAT_DIRECT_URL, "_blank", "noopener,noreferrer");
}

export function scheduleLiveChatLoad() {
  if (typeof window === "undefined" || liveChatLoadStarted) {
    return () => {};
  }

  const liveChatWindow = window as WindowWithLiveChat;
  let cancelled = false;
  let cancelScheduledLoad = () => {};
  const load = () => {
    if (!cancelled) {
      initLiveChat();
    }
  };

  const scheduleIdleLoad = () => {
    if (cancelled || liveChatLoadStarted) return;

    if (liveChatWindow.requestIdleCallback) {
      const idleId = liveChatWindow.requestIdleCallback(load, { timeout: 5000 });
      cancelScheduledLoad = () => {
        liveChatWindow.cancelIdleCallback?.(idleId);
      };
      return;
    }

    const timeoutId = window.setTimeout(load, 3500);
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
