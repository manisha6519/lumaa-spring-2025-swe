import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<TaskList />} />  {/* Task list route */}
        <Route path="/create-task" element={<TaskForm />} />  {/* New task creation route */}
        <Route path="/login" element={<Login />} />  {/* Login route */}
        <Route path="/register" element={<Register />} />  {/* Register route */}
      </Routes>
    </Router>
  );
};

export default App;
