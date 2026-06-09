import { useEffect } from "react";
import { LandingPage } from "./components/LandingPage";
import { scheduleLiveChatLoad } from "./lib/liveChat";

export default function App() {
  useEffect(() => scheduleLiveChatLoad(), []);

  return <LandingPage />;
}
