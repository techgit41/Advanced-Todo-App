import React, { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import './Stats.css';

const Stats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = useApi();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await api.get('/api/todos/stats');
      setStats(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading statistics...</div>;
  if (!stats) return <div>Error loading statistics</div>;

  const { overall, byCategory } = stats;

  return (
    <div className="stats-container">
      <h1>Todo Statistics</h1>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Todos</h3>
          <div className="stat-number">{overall.total}</div>
        </div>
        
        <div className="stat-card completed">
          <h3>Completed</h3>
          <div className="stat-number">{overall.completed}</div>
          <div className="stat-percentage">
            {overall.total > 0 ? Math.round((overall.completed / overall.total) * 100) : 0}%
          </div>
        </div>
        
        <div className="stat-card high-priority">
          <h3>High Priority</h3>
          <div className="stat-number">{overall.highPriority}</div>
        </div>
        
        <div className="stat-card overdue">
          <h3>Overdue</h3>
          <div className="stat-number">{overall.overdue}</div>
        </div>
      </div>

      <div className="category-stats">
        <h2>Statistics by Category</h2>
        <div className="category-grid">
          {byCategory.map(category => (
            <div key={category._id} className="category-card">
              <h3>{category._id || 'Uncategorized'}</h3>
              <div className="category-numbers">
                <span>Total: {category.count}</span>
                <span>Completed: {category.completed}</span>
                <span>
                  Progress: {category.count > 0 ? Math.round((category.completed / category.count) * 100) : 0}%
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${category.count > 0 ? (category.completed / category.count) * 100 : 0}%` 
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;