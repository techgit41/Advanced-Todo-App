import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import './TodoForm.css';

const TodoForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'general',
    priority: 'medium',
    dueDate: '',
    tags: '',
    completed: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);
  const api = useApi();

  useEffect(() => {
    if (isEditing) {
      fetchTodo();
    }
  }, [id]);

  const fetchTodo = async () => {
    try {
      const todos = await api.get('/api/todos');
      const todo = todos.find(t => t._id === id);
      if (todo) {
        setFormData({
          title: todo.title,
          description: todo.description || '',
          category: todo.category || 'general',
          priority: todo.priority || 'medium',
          dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '',
          tags: todo.tags ? todo.tags.join(', ') : '',
          completed: todo.completed || false
        });
      }
    } catch (error) {
      console.error('Error fetching todo:', error);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      setError('Failed to load todo');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (isEditing) {
        await api.put(`/api/todos/${id}`, submitData);
      } else {
        await api.post('/api/todos', submitData);
      }

      navigate('/todos');
    } catch (error) {
      console.error('Error saving todo:', error);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      setError(error.response?.data?.message || 'Failed to save todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="todo-form-container">
      <div className="todo-form-card">
        <h1>{isEditing ? 'Edit Todo' : 'Create New Todo'}</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter todo title..."
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Enter todo description (optional)..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="general">General</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Tags</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          {isEditing && (
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="completed"
                  checked={formData.completed}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                Mark as completed
              </label>
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/todos')}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Todo' : 'Create Todo')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;