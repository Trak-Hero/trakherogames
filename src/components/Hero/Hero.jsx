import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import BackgroundOrbs from "../Effects/BackgroundOrbs";
import GrainOverlay from "../Effects/GrainOverlay";
import FloatingText from "./FloatingText";

export default function Hero({ children }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-fade", {
        opacity: 0,
        y: -20,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
      });

      gsap.from(".hero-copy", {
        opacity: 0,
        y: 20,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(".project-title", {
        opacity: 0,
        y: 28,
        duration: 1,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.35,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero-page">
      <video
        className="bg-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/herolow.mp4" type="video/mp4" />
      </video>

      <div className="bg-dark-layer" />
      <BackgroundOrbs />
      <GrainOverlay />
      <FloatingText />

      <header className="site-header">
        <Link to="/about-room" className="nav-fade nav-link">ABOUT</Link>

        <div className="nav-fade site-logo-wrap">
          <div className="site-logo-main">TRAK HERO</div>
          <div className="site-logo-sub">GAME PORTFOLIO</div>
        </div>

        <button className="nav-fade nav-link">EMAIL</button>
      </header>

      <main className="hero-content">
        <div className="hero-copy">
          <p className="intro-chip">TRAK (PURIN) PRATEEPMANOWONG</p>
          <h1 className="hero-heading">
            Telling a story
            <span> one world at a time.</span>
          </h1>
          <p className="hero-description">
            A portfolio of game development, XR games, internship projects,
            and worldbuilding experiments that has impacted my life. From building games for internal corporate use to narrative-based games, I am passionate about creating immersive experiences that blend storytelling, interactivity, and emotional resonance. Explore the projects around this page to see how I bring worlds to life through game design and development.
          </p>
        </div>

        {children}
      </main>

      <footer className="site-footer">
        <span>TRAK'S MAIN PORTFOLIO</span>
        <span>LINKEDIN</span>
      </footer>
    </section>
  );
}