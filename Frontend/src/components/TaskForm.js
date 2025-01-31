import React, { useState } from 'react';
import { createTask, updateTask } from '../services/api';

function TaskForm({ task, onTaskSaved }) {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [priority, setPriority] = useState(task ? task.priority : 'Media');
  const [dueDate, setDueDate] = useState(task ? task.dueDate : '');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (task) {
        await updateTask(task._id, { title, description, priority, dueDate });
      } else {
        await createTask({ title, description, priority, dueDate });
      }
      onTaskSaved();
      setTitle('');
      setDescription('');
      setPriority('Media');
      setDueDate('');
    } catch (error) {
      console.error("Error guardando tarea:", error);
      setError("No se pudo guardar la tarea.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className='Name' placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <br></br>
      <textarea placeholder="Descripcion" rows="10" className='desc' value={description} onChange={(e) => setDescription(e.target.value)} required />
      <br></br> <br></br>
      <p>Prioridad:</p>
      <select className="prioridad" value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>
      <br></br> <br></br>
      <button type="submit">{task ? "Actualizar tarea" : "Crear tarea"}</button>
      <br></br> <br></br>
    </form>
  );
}

export default TaskForm;

