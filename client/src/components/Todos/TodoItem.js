import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import './TodoItem.css';

const TodoItem = ({ todo, onDelete, onToggleComplete }) => {
  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };
    return <span className={`priority-badge ${priorityClasses[priority]}`}>{priority}</span>;
  };

  const isOverdue = () => {
    if (!todo.dueDate || todo.completed) return false;
    return new Date(todo.dueDate) < new Date();
  };

  const handleToggleComplete = () => {
    console.log('Toggle complete clicked for todo:', todo._id, 'current status:', todo.completed);
    onToggleComplete(todo._id, todo.completed);
  };

  const handleDelete = () => {
    console.log('Delete clicked for todo:', todo._id);
    onDelete(todo._id);
  };

  return (
    <div className={`todo-item card ${todo.completed ? 'completed' : ''} ${isOverdue() ? 'overdue' : ''}`}>
      <div className="todo-header">
        <h3 className="todo-title">{todo.title}</h3>
        <div className="todo-actions">
          <button
            onClick={handleToggleComplete}
            className={`btn btn-sm ${todo.completed ? 'btn-warning' : 'btn-success'}`}
          >
            {todo.completed ? 'Undo' : 'Complete'}
          </button>
          <Link to={`/edit-todo/${todo._id}`} className="btn btn-sm btn-info">
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </div>
      </div>

      {todo.description && (
        <p className="todo-description">{todo.description}</p>
      )}

      <div className="todo-meta">
        <div className="meta-tags">
          {getPriorityBadge(todo.priority)}
          {todo.category && <span className="category-tag">{todo.category}</span>}
          {todo.tags && todo.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="meta-dates">
          {todo.dueDate && (
            <span className={`due-date ${isOverdue() ? 'overdue' : ''}`}>
              Due: {format(new Date(todo.dueDate), 'MMM dd, yyyy')}
              {isOverdue() && ' ⚠️'}
            </span>
          )}
          <span className="created-date">
            Created: {format(new Date(todo.createdAt), 'MMM dd, yyyy')}
          </span>
        </div>
      </div>

      {todo.completed && (
        <div className="completion-badge">
          ✅ Completed on {format(new Date(todo.updatedAt), 'MMM dd, yyyy')}
        </div>
      )}
    </div>
  );
};

export default TodoItem;