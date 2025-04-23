import React, { useState, useEffect } from "react";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import { db } from "./firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getApp } from "firebase/app";

function App() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const projectsFromDB = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProjects(projectsFromDB);
    };

    fetchProjects();
  }, []);

  const handleAddProject = async (project) => {
    const docRef = await addDoc(collection(db, "projects"), project);
    setProjects([...projects, { ...project, id: docRef.id }]);
  };

  const handleDeleteProject = async (id) => {
    try {
      const functions = getFunctions(getApp());
      const deleteProject = httpsCallable(functions, "deleteProject");
      await deleteProject({ id });
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      console.warn(
        "No se pudo usar Cloud Function, usando deleteDoc directamente..."
      );
      console.error(error);

      await deleteDoc(doc(db, "projects", id));
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gestión de Proyectos</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          marginBottom: "1.5rem",
          padding: "0.6rem 1rem",
          fontWeight: "bold",
          backgroundColor: "#111",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {showForm ? "Ocultar Formulario" : "Agregar Proyecto"}
      </button>

      {showForm && <ProjectForm onAdd={handleAddProject} />}

      <h2>Lista de proyectos</h2>
      {projects.length === 0 ? (
        <p>No hay proyectos</p>
      ) : (
        <ProjectList projects={projects} onDelete={handleDeleteProject} />
      )}
    </div>
  );
}

export default App;
