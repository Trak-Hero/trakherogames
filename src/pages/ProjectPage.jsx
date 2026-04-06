import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { projects } from "../data/projects";
import GrainOverlay from "../components/Effects/GrainOverlay";
import { useEffect, useRef, useState } from "react";

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const videoRef = useRef(null);
  const [audioBlocked, setAudioBlocked] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fadeInterval;

    const startVideo = async () => {
      try {
        video.pause();
        video.currentTime = 0;
        video.muted = false;
        video.volume = 0;

        await video.play();

        // fade audio in smoothly
        fadeInterval = setInterval(() => {
          if (!video) return;
          if (video.volume < 0.95) {
            video.volume = Math.min(video.volume + 0.08, 1);
          } else {
            clearInterval(fadeInterval);
          }
        }, 120);

        setAudioBlocked(false);
      } catch (err) {
        // browser blocked autoplay with sound
        video.muted = true;
        try {
          await video.play();
        } catch (_) {}
        setAudioBlocked(true);
      }
    };

    startVideo();

    return () => {
      clearInterval(fadeInterval);
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.volume = 1;
        video.muted = true;
      }
    };
  }, [slug]);

  const enableSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      video.muted = false;
      video.volume = 1;
      await video.play();
      setAudioBlocked(false);
    } catch (err) {
      console.error("Unable to enable sound:", err);
    }
  };

  if (!project) {
    return (
      <div className="project-page not-found">
        <Link to="/" className="back-link">← Back</Link>
        <h1>Project not found.</h1>
      </div>
    );
  }

  return (
    <motion.section
      className="project-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <video
        ref={videoRef}
        className="bg-video"
        loop
        playsInline
        preload="auto"
      >
        <source src={project.heroVideo} type="video/mp4" />
      </video>

      <div className="project-overlay" />
      <GrainOverlay />

      <header className="project-header">
        <Link to="/" className="back-link">← Back</Link>
        <div className="project-header-brand">TRAK HERO STUDIO GAMES</div>
      </header>

      {audioBlocked && (
        <button className="sound-enable-btn" onClick={enableSound}>
          Enable Sound
        </button>
      )}

      <div className="project-layout">
        <div className="project-main">
          <p className="project-subtitle">{project.subtitle}</p>
          <h1 className="project-heading">{project.title}</h1>
          <p className="project-year">[{project.year}]</p>
          <p className="project-description">{project.description}</p>
        </div>

        <aside className="project-panel">
          <div className="panel-block">
            <div className="panel-label">PROJECT NOTES</div>
            {project.details.map((item) => (
              <p key={item} className="panel-text">{item}</p>
            ))}
          </div>

          <div className="panel-block">
            <div className="panel-label">STACK</div>
            <div className="stack-list">
              {project.stack.map((item) => (
                <span key={item} className="stack-badge">{item}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </motion.section>
  );
}