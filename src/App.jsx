import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import ProjectPage from "./pages/ProjectPage";
import AboutRoom from "./pages/AboutRoom";
import StoryPage from "./pages/StoryPages";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectPage />} />
        <Route path="/about-room" element={<AboutRoom />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
    </AnimatePresence>
  );
}