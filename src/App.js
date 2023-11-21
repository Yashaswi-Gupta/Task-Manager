// src/App.js
import React, { useState } from 'react';
import Task from './Task';
import './styles.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState('');

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
      setNewTask('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    // Clear editing state if the task being edited is deleted
    if (editingTaskId === taskId) {
      setEditingTaskId(null);
      setEditingTaskText('');
    }
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const startEditingTask = (taskId, taskText) => {
    setEditingTaskId(taskId);
    setEditingTaskText(taskText);
  };

  const updateTask = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingTaskId ? { ...task, text: editingTaskText } : task
      )
    );
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  return (
    <div className="container bg-gray-100 p-4 ">
      <h1 className="text-3xl font-bold text-center text-purple-600">
        Task Manager
      </h1>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border border-purple-300 rounded px-2 py-1 mr-2"
        />
        <button
          onClick={addTask}
          className="bg-purple-600 text-white rounded px-4 py-2"
        >
          Add Task
        </button>
      </div>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleTask}
            onUpdate={updateTask}
            onStartEdit={startEditingTask}
            isEditing={editingTaskId === task.id}
          />
        ))}
      </div>
      {editingTaskId !== null && (
        <div className="flex justify-center mt-4">
          <input
            type="text"
            value={editingTaskText}
            onChange={(e) => setEditingTaskText(e.target.value)}
            className="border border-purple-300 rounded px-2 py-1 mr-2"
          />
          <button
            onClick={updateTask}
            className="bg-purple-600 text-white rounded px-4 py-2"
          >
            Update Task
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
