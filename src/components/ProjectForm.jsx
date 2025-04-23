import React, { useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";

function ProjectForm({ onAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [validator] = useState(
    new SimpleReactValidator({
      messages: {
        required: "Este campo es obligatorio.",
        min: "Debe tener al menos :min caracteres.",
      },
    })
  );
  const [forceUpdate, setForceUpdate] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator.allValid()) {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos/1"
      );

      const newProject = {
        name,
        description,
        extraInfo: data.title,
      };

      onAdd(newProject);

      setName("");
      setDescription("");
      validator.hideMessages();
    } else {
      validator.showMessages();
      setForceUpdate(forceUpdate + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "1rem" }}>
        <label>Nombre del proyecto:</label>
        <br />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        />
        <div style={{ color: "red" }}>
          {validator.message("nombre", name, "required")}
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Descripción:</label>
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", padding: "0.5rem", marginTop: "0.25rem" }}
        ></textarea>
        <div style={{ color: "red" }}>
          {validator.message("descripción", description, "min:10")}
        </div>
      </div>

      <button
        type="submit"
        style={{ padding: "0.75rem 1.5rem", fontWeight: "bold" }}
      >
        Guardar Proyecto
      </button>
    </form>
  );
}

export default ProjectForm;
