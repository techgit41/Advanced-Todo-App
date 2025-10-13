import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { format } from 'date-fns';
import './Dashboard.css';

const Dashboard = () => {
  const [recentTodos, setRecentTodos] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = useApi();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [todosData, statsData] = await Promise.all([
        api.get('/api/todos?sortBy=createdAt&sortOrder=desc&limit=5'),
        api.get('/api/todos/stats')
      ]);

      setRecentTodos(todosData);
      setStats(statsData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      setLoading(false);
    }
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };
    return <span className={`priority-badge ${priorityClasses[priority]}`}>{priority}</span>;
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's your productivity overview.</p>
      </div>

      {stats && (
        <div className="stats-overview">
          <div className="stat-item">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{stats.overall.total}</h3>
              <p>Total Todos</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.overall.completed}</h3>
              <p>Completed</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⚡</div>
            <div className="stat-info">
              <h3>{stats.overall.highPriority}</h3>
              <p>High Priority</p>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <h3>{stats.overall.overdue}</h3>
              <p>Overdue</p>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="recent-todos card">
          <div className="section-header">
            <h2>Recent Todos</h2>
            <Link to="/todos" className="btn btn-outline">View All</Link>
          </div>
          {recentTodos.length > 0 ? (
            <div className="todos-list">
              {recentTodos.map(todo => (
                <div key={todo._id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-main">
                    <h4>{todo.title}</h4>
                    <div className="todo-meta">
                      {getPriorityBadge(todo.priority)}
                      {todo.category && <span className="category-tag">{todo.category}</span>}
                      {todo.dueDate && (
                        <span className="due-date">
                          Due: {format(new Date(todo.dueDate), 'MMM dd, yyyy')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="todo-status">
                    {todo.completed ? (
                      <span className="status-completed">Completed</span>
                    ) : (
                      <span className="status-pending">Pending</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No todos yet. Create your first todo to get started!</p>
              <Link to="/add-todo" className="btn btn-primary">Create Todo</Link>
            </div>
          )}
        </div>

        <div className="quick-actions card">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <Link to="/add-todo" className="action-card">
              <div className="action-icon">➕</div>
              <h3>Add Todo</h3>
              <p>Create a new task</p>
            </Link>
            <Link to="/todos" className="action-card">
              <div className="action-icon">📝</div>
              <h3>View All</h3>
              <p>See all your tasks</p>
            </Link>
            <Link to="/stats" className="action-card">
              <div className="action-icon">📈</div>
              <h3>Statistics</h3>
              <p>View your progress</p>
            </Link>
            <Link to="/profile" className="action-card">
              <div className="action-icon">👤</div>
              <h3>Profile</h3>
              <p>Manage account</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;