import React from 'react';

export default function Home({ setView }) {
  return (
    <div className="card">
      <h2>Welcome to the Todo App</h2>
      <p>Organize your life with our simple, secure task manager.</p>
      <button onClick={() => setView('auth')}>Get Started / Sign In</button>
    </div>
  );
}