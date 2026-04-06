import ProjectTitle from "./ProjectTitle";

export default function ProjectList({ projects }) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <ProjectTitle key={project.slug} project={project} />
      ))}
    </div>
  );
}