import React, { useState } from 'react';
import api from '../utils/api';

const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await api.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
    } catch (error) {
      alert('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <textarea 
        placeholder="Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
