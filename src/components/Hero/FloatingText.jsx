import { Link } from "react-router-dom";
import { useRef } from "react";
import gsap from "gsap";

const floatingLabels = [
  { text: "WHAT REMAINS SINGS", className: "float-label top-left", to: "/project/what-remains-sings" },
  { text: "POCKET PRIX", className: "float-label bottom-left", to: "/project/pocket-prix" },
  { text: "TOAD & I", className: "float-label top-right", to: "/project/toad-and-i" },
  { text: "COM7 TOWN", className: "float-label mid-right", to: "/project/com7-town" },
  { text: "REMEMBER ME", className: "float-label mid-left", to: "/project/remember-me" },
  { text: "SNOW TOWN", className: "float-label bottom-right", to: "/project/snow-town" },
];

export default function FloatingText() {
  const refs = useRef([]);

  const handleEnter = (index) => {
    gsap.to(refs.current[index], {
      y: -4,
      scale: 1.04,
      duration: 0.22,
      ease: "power2.out",
    });
  };

  const handleLeave = (index) => {
    gsap.to(refs.current[index], {
      y: 0,
      scale: 1,
      duration: 0.22,
      ease: "power2.out",
    });
  };

  return (
    <>
      {floatingLabels.map((item, index) => (
        <Link
          key={item.text}
          to={item.to}
          ref={(el) => (refs.current[index] = el)}
          className={`${item.className} float-link`}
          onMouseEnter={() => handleEnter(index)}
          onMouseLeave={() => handleLeave(index)}
        >
          <span className="float-link-inner">{item.text}</span>
          <span className="float-link-indicator">↗</span>
        </Link>
      ))}
    </>
  );
}