import React from "react";
import ProjectItem from "./ProjectItem";

function ProjectList({ projects, onDelete }) {
  return (
    <ul>
      {projects.map((proj) => (
        <ProjectItem key={proj.id} project={proj} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ProjectList;
