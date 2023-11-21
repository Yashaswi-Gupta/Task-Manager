// src/Task.js
import React, { useState } from 'react';

const Task = ({ task, onDelete, onToggle, onUpdate, onStartEdit, isEditing }) => {
  const [editing, setEditing] = useState(isEditing);
  const [updatedText, setUpdatedText] = useState(task.text);

  const handleUpdate = () => {
    onUpdate(task.id, updatedText);
    setEditing(false);
  };

  return (
    <div style={{ borderBottom: '1px solid #ccc', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
      {!editing ? (
        <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>{task.text}</span>
      ) : (
        <input
          type="text"
          value={updatedText}
          onChange={(e) => setUpdatedText(e.target.value)}
        />
      )}
      <div>
        {!editing ? (
          <>
            <label className="container">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggle(task.id)}
                />
                <span className="checkmark"></span>
            </label>
            
            <button onClick={() => onStartEdit(task.id, task.text)} className="edit-button"><svg viewBox="0 0 448 512" class="svgIcon"><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg></button>
          </>
        ) : (
          <button onClick={handleUpdate}>Update</button>
        )}
        <button onClick={() => onDelete(task.id)} className='del-button'>
          <svg viewBox="0 0 448 512" className="svgIcon">
            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Task;
