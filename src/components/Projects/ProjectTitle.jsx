import { Link } from "react-router-dom";

export default function ProjectTitle({ project }) {
  return (
    <Link to={`/project/${project.slug}`} className="project-title">
      <span>{project.title}</span>
      <sup>[{project.id}]</sup>
    </Link>
  );
}