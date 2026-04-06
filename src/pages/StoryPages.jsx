import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { storyPages } from "../data/storyPages.jsx";
import "../styles/storybook.css";

export default function StoryPage() {
  const [pageIndex, setPageIndex] = useState(0);
  const page = storyPages[pageIndex];

  const prevPage = () => {
    setPageIndex((prev) => Math.max(prev - 1, 0));
  };

  const nextPage = () => {
    setPageIndex((prev) => Math.min(prev + 1, storyPages.length - 1));
  };

  return (
    <motion.div
      className="storybook-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="storybook-topbar">
        <Link to="/about-room" className="storybook-back">
          ← Back to Reading Room
        </Link>
        <Link to="/" className="storybook-back">
          Main Page
        </Link>
      </div>

      <div className="storybook-wrapper">
        <button className="storybook-nav left" onClick={prevPage} disabled={pageIndex === 0}>
          ‹
        </button>

        <div className="storybook-book">
          <div className="storybook-spread">
            <div className="storybook-left">
              <div className="storybook-text-block">
                <h2>{page.title}</h2>
                <p>{page.text}</p>
              </div>
              <div className="storybook-page-number">{pageIndex * 2 + 1}</div>
            </div>

            <div
              className="storybook-right"
              style={{ backgroundImage: `url(${page.image})` }}
            >
              <div className="storybook-right-overlay">
                {page.highlight && <div className="storybook-highlight">{page.highlight}</div>}
              </div>
              <div className="storybook-page-number right-num">{pageIndex * 2 + 2}</div>
            </div>
          </div>
        </div>

        <button
          className="storybook-nav right"
          onClick={nextPage}
          disabled={pageIndex === storyPages.length - 1}
        >
          ›
        </button>
      </div>
    </motion.div>
  );
}