import React, { useEffect, useState } from 'react';
import { fetchTasks } from '../services/api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error cargadando tareas:", error);
      setError("No se pudieron cargar las tareas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className='task-frame'>

      <br></br><br></br>
      <h2>Dashboard</h2>
      
      <br></br><br></br>
      {loading && <p>Loading tasks...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <TaskForm task={editingTask} onTaskSaved={loadTasks} />
      
      <TaskList tasks={tasks} onTaskUpdated={setEditingTask} onTaskDeleted={loadTasks} />
    </div>
  );
}

export default Dashboard;