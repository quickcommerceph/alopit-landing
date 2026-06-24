import { useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { initAnalytics } from "./lib/analytics";
import { scheduleLiveChatLoad } from "./lib/liveChat";

export default function App() {
  useEffect(() => {
    const cancelLiveChatLoad = scheduleLiveChatLoad();
    const cancelAnalyticsLoad = initAnalytics();

    return () => {
      cancelLiveChatLoad();
      cancelAnalyticsLoad();
    };
  }, []);

  return <LandingPage />;
}
