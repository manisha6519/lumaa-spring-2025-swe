import React, { useEffect, useState } from 'react';
import api from '../utils/api';

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null); // State for editing

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await api.get('/tasks');
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const handleUpdate = async (taskId: number, updatedTask: Partial<Task>) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, updatedTask);
      if (response.status === 200) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === taskId ? { ...task, ...updatedTask } : task
          )
        );
        setEditingTask(null); // Exit edit mode after update
      } else {
        alert('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task');
    }
  };

  const handleDelete = async (taskId: number) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Error deleting task');
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTask?.id === task.id ? (
              <div>
                <input
                  type="text"
                  value={editingTask.title}
                  onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                />
                <textarea
                  value={editingTask.description}
                  onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                />
                <button onClick={() => handleUpdate(task.id, editingTask)}>Save</button>
                <button onClick={() => setEditingTask(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.status ? 'Completed' : 'Not completed'}</p>
                <button onClick={() => handleUpdate(task.id, { status: true })}>Mark as Complete</button>
                <button onClick={() => setEditingTask(task)}>Edit</button>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
