import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ReadingRoomScene from "../components/About3D/ReadingRoomScene";
import "../styles/aboutRoom.css";

export default function AboutRoom() {
  return (
    <motion.div
      className="about-room-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="about-room-ui">
        <Link to="/" className="about-room-back">
          ← Back to Main Page
        </Link>

        <div className="about-room-title">
          <div className="about-room-label">TRAK HERO STUDIO</div>
          <h1>The Reading Room</h1>
          <p>Walk through the room and approach the book to read Trak’s story. User W,A,S,D to move around!</p>
        </div>
      </div>

      <ReadingRoomScene />
    </motion.div>
  );
}