import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useApi } from '../../hooks/useApi';
import TodoItem from './TodoItem';
import FilterBar from './FilterBar';
import './TodoList.css';

const socket = io('http://localhost:5000');

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    priority: '',
    completed: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const api = useApi();

  useEffect(() => {
    fetchTodos();
    
    socket.on('todoUpdated', handleTodoUpdate);
    
    return () => {
      socket.off('todoUpdated', handleTodoUpdate);
    };
  }, [filters]);

  const fetchTodos = async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const data = await api.get(`/api/todos?${params}`);
      console.log('✅ Fetched todos:', data);
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error fetching todos:', error);
      if (error.response?.status === 401) {
        window.location.href = '/login';
      }
      setLoading(false);
    }
  };

  const handleTodoUpdate = (data) => {
    console.log('🔔 Socket update received:', data);
    if (data.action === 'created') {
      setTodos(prev => [data.todo, ...prev]);
    } else if (data.action === 'updated') {
      setTodos(prev => prev.map(todo => 
        todo._id === data.todo._id ? data.todo : todo
      ));
    } else if (data.action === 'deleted') {
      setTodos(prev => prev.filter(todo => todo._id !== data.todoId));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await api.delete(`/api/todos/${id}`);
        setTodos(prev => prev.filter(todo => todo._id !== id));
      } catch (error) {
        console.error('❌ Error deleting todo:', error);
        if (error.response?.status === 401) {
          window.location.href = '/login';
        }
      }
    }
  };

  const handleToggleComplete = async (id, currentCompletedStatus) => {
    console.log('🔄 Toggling todo:', id, 'from:', currentCompletedStatus, 'to:', !currentCompletedStatus);
    
    try {
      const updateData = {
        completed: !currentCompletedStatus
      };
      
      console.log('📤 Sending update data:', updateData);
      
      const response = await api.put(`/api/todos/${id}`, updateData);
      
      console.log('✅ Server response:', response);
      
      // Update with server response
      setTodos(prev => prev.map(todo => 
        todo._id === id ? response : todo
      ));
      
    } catch (error) {
      console.error('❌ Error updating todo:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      if (error.response?.status === 401) {
        alert('Your session has expired. Please login again.');
        window.location.href = '/login';
      } else if (error.response?.data?.message) {
        alert(`Failed to update todo: ${error.response.data.message}`);
      } else {
        alert('Failed to update todo. Please check your connection and try again.');
      }
    }
  };

  if (loading) return <div className="loading">Loading todos...</div>;

  return (
    <div className="todo-list-container">
      <div className="todo-list-header">
        <h1>My Todos</h1>
        <Link to="/add-todo" className="btn btn-primary">
          Add New Todo
        </Link>
      </div>

      <FilterBar filters={filters} onFilterChange={setFilters} />

      <div className="todos-grid">
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDelete={handleDelete}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>

      {todos.length === 0 && (
        <div className="empty-state">
          <p>No todos found. {filters.search ? 'Try different filters.' : 'Create your first todo!'}</p>
          {!filters.search && (
            <Link to="/add-todo" className="btn btn-primary">
              Add Your First Todo
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default TodoList;