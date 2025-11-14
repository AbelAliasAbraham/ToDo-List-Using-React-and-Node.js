import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios'; // 🚀 Import Axios for HTTP requests
import Home from './Home.jsx';         
import Auth from './Auth.jsx';         
import TodoList from './TodoList.jsx'; 

// IMPORTANT: Define your backend API URL
const API_URL = "http://localhost:5000/api";

// 🔑 Export the Context for sharing state and functions across components
export const TodoAppContext = createContext(null); 


export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(''); // Stores the 'Bearer <token>' string
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [view, setView] = useState('home'); 

  // --- API Handlers ---

  // Fetches the user's todos from the backend
  const loadTodos = async () => {
    if (!token) return;
    try {
      // Axios GET Request, includes token in headers
      const res = await axios.get(`${API_URL}/todos`, { 
        headers: { "Authorization": token } 
      });
      setTodos(res.data); // Axios automatically provides JSON data in res.data
    } catch (error) {
      console.error("Failed to load todos:", error);
      // Handle expired token or authorization errors
      if (error.response && error.response.status === 401) {
          alert("Session expired. Please log in again.");
          logout();
      }
    }
  };

  // Adds a new todo item
  const addTodo = async () => {
    const text = todoInput.trim();
    if (!text) return alert("Enter a todo");

    try {
        // Axios POST Request
        const res = await axios.post(`${API_URL}/todos`, { text }, {
            headers: { "Authorization": token }
        });

        if(res.data._id) {
            setTodoInput('');
            loadTodos(); // Reload the list to show the new item
        } 
    } catch (error) {
        alert(error.response?.data?.error || "Failed to add todo");
    }
  };

  // Handles user login
  const login = async () => {
    if (!username || !password) return alert("Enter username and password");
    
    try {
        // Axios POST Request
        const res = await axios.post(`${API_URL}/auth/login`, { username, password });

        if (res.data.token) {
          setToken(res.data.token); // Save the Bearer token
          setUsername('');
          setPassword('');
          setView('todos'); // Navigate to the Todo list
        }
    } catch (error) {
        // Axios places server error response in error.response.data
        alert(error.response?.data?.error || "Login failed");
    }
  };

  // Handles user logout
  const logout = () => {
    setToken('');
    setTodos([]);
    setView('home');
  };
  
  // --- View Management (Simple Routing) ---
  const renderContent = () => {
      if (view === 'home') {
          return <Home setView={setView} />;
      }
      
      if (view === 'auth' && !token) {
          return (
            <Auth 
              username={username} setUsername={setUsername}
              password={password} setPassword={setPassword}
              // register function would be defined here or passed down if implemented
              register={() => alert("Registration not fully implemented in App.jsx.")}
              login={login}
            />
          );
      }
      
      if (view === 'todos' && token) {
          return (
            <TodoList 
              todos={todos}
              todoInput={todoInput}
              setTodoInput={setTodoInput}
              addTodo={addTodo}
              logout={logout}
            />
          );
      }
      
      return null;
  };

  return (
    // Wrap the entire application to provide context values
    <TodoAppContext.Provider value={{ token, loadTodos }}>
        
        {/* Full-Width Header (Defined outside .container for full width) */}
        <header className="header">
            <h1>Todo App</h1>
            <nav className="nav">
              <button className={view === 'home' ? 'nav-active' : ''} onClick={() => setView('home')}>Home</button>
              
              {token ? (
                <>
                    <button className={view === 'todos' ? 'nav-active' : ''} onClick={() => setView('todos')}>Todo</button>
                    <button className="logout" onClick={logout}>Logout</button>
                </>
              ) : (
                <button className={view === 'auth' ? 'nav-active' : ''} onClick={() => setView('auth')}>Sign In</button>
              )}
            </nav>
        </header>

        {/* Constrained Content Container */}
        <div className="container">
          {renderContent()}
        </div>
        
    </TodoAppContext.Provider>
  );
}