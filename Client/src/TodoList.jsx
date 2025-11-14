import React, { useState, useContext } from 'react';
import axios from 'axios'; // 🚀 Import Axios
import { TodoAppContext } from './App.jsx'; 

const API_URL = "http://localhost:5000/api";

// --- Nested TodoItem Component ---
function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  const { token, loadTodos } = useContext(TodoAppContext); 

  // 🚀 Axios PUT Request
  const toggleTodo = async (id, completedStatus) => {
    setIsCompleted(completedStatus);
    
    await axios.put(`${API_URL}/todos/${id}`, { completed: completedStatus }, {
      headers: { "Authorization": token }
    });
  };

  // 🚀 Axios DELETE Request
  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/todos/${id}`, {
      headers: { "Authorization": token }
    });
    loadTodos();
  };

  // 🚀 Axios PUT Request
  const updateTodoText = async (id, newText) => {
    if (!newText.trim()) return alert("Todo text cannot be empty");
    
    await axios.put(`${API_URL}/todos/${id}`, { text: newText }, {
      headers: { "Authorization": token }
    });
    
    setIsEditing(false);
    loadTodos();
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => toggleTodo(todo._id, e.target.checked)}
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={{flex: 1, marginLeft: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '3px'}}
        />
      ) : (
        <span className={isCompleted ? "completed" : ""}>
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <button className="save-btn" onClick={() => updateTodoText(todo._id, editText)}>
          Save
        </button>
      ) : (
        <button className="edit-btn" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}

      <button onClick={() => deleteTodo(todo._id)}>
        ❌
      </button>
    </li>
  );
}

// --- TodoList Main Component (No Change to props/render) ---
export default function TodoList({ todos, todoInput, setTodoInput, addTodo, logout }) {
  return (
    <div id="todo-section" className="card">
      <h2>My Tasks</h2>
      <div className="add-todo">
        <input
          type="text"
          id="todoInput"
          placeholder="New Todo"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
        <button onClick={logout} className="logout">Logout</button>
      </div>
      <ul id="todoList">
        {todos.length === 0 ? (
            <li style={{justifyContent: 'center'}}>No tasks yet! Add one above.</li>
        ) : (
            todos.map(todo => (
                <TodoItem 
                    key={todo._id} 
                    todo={todo} 
                />
            ))
        )}
      </ul>
    </div>
  );
}