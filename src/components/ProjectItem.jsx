import React from "react";

function ProjectItem({ project, onDelete }) {
  return (
    <React.Fragment>
      <li style={{ marginBottom: "1.5rem" }}>
        <strong>{project.name}</strong>
        <br />
        {project.description}
        <br />
        <em>Extra info: {project.extraInfo}</em>
        <br />

        <button
          onClick={() => onDelete(project.id)}
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 1rem",
            fontWeight: "bold",
            backgroundColor: "#111",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Eliminar
        </button>
      </li>
    </React.Fragment>
  );
}

export default ProjectItem;