import React from 'react';
import { deleteTask } from '../services/api';

function TaskList({ tasks, onTaskUpdated, onTaskDeleted }) {
  const handleDelete = async (id) => {
    if (window.confirm("Estas seguro de quere eliminar esta tarea?")) {
      await deleteTask(id);
      onTaskDeleted();
    }
  };

  return (
    <ul>
      {tasks.length > 0 ? (
        tasks.map(task => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Prioridad: {task.priority}</p>
            <button onClick={() => onTaskUpdated(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))
      ) : (
        <p>No hay tareas disponibles.</p>
      )}
    </ul>
  );
}

export default TaskList;

