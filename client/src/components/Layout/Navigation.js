import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ServerStatus from './ServerStatus';
import './Navigation.css';

const Navigation = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <>
      <ServerStatus />
      <nav className="navbar">
        <div className="nav-content">
          <div className="nav-logo">
            <Link to="/" className="nav-link">✅ My Todo App</Link>
          </div>
          
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/todos" 
              className={`nav-link ${location.pathname === '/todos' ? 'active' : ''}`}
            >
              Todos
            </Link>
            <Link 
              to="/add-todo" 
              className={`nav-link ${location.pathname === '/add-todo' ? 'active' : ''}`}
            >
              Add Todo
            </Link>
            <Link 
              to="/stats" 
              className={`nav-link ${location.pathname === '/stats' ? 'active' : ''}`}
            >
              Statistics
            </Link>
            <Link 
              to="/profile" 
              className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
            >
              Profile
            </Link>
            <span className="nav-user">Hello, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;