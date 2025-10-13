import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <Link to="/" className="logo-link">✅ My Todo App</Link>
            <p className="footer-description">
              Your productivity companion. Manage tasks efficiently with our advanced todo application.
            </p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/todos">My Todos</Link></li>
            <li><Link to="/add-todo">Add Todo</Link></li>
            <li><Link to="/stats">Statistics</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Features</h3>
          <ul className="footer-links">
            <li>📝 Smart Task Management</li>
            <li>📊 Progress Tracking</li>
            <li>🔔 Real-time Updates</li>
            <li>📱 Responsive Design</li>
            <li>🔒 Secure Authentication</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            <a href="https://github.com/techgit41" target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-icon">🐙</span>
              GitHub
            </a>
            
            <a href="https://linkedin.com/in/yenework-fekadie" target="_blank" rel="noopener noreferrer" className="social-link">
              <span className="social-icon">💼</span>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} My Todo App. Developed by Yenework Fekadie</p>
          <div className="footer-bottom-links">
            <a href="https://github.com/techgit41">Contact Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;