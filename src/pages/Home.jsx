import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import ProjectList from "../components/Projects/ProjectList";
import { projects } from "../data/projects";

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero onAboutClick={() => navigate("/about-world")}>
        <ProjectList projects={projects} />
      </Hero>
    </motion.div>
  );
}
