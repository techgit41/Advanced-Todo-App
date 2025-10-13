import React from 'react';
import './FilterBar.css';

const FilterBar = ({ filters, onFilterChange }) => {
  const handleFilterChange = (key, value) => {
    onFilterChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      priority: '',
      completed: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const hasActiveFilters = filters.category || filters.priority || filters.completed || filters.search;

  return (
    <div className="filter-bar card">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search todos..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="general">General</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
        </select>
      </div>

      <div className="filter-group">
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange('priority', e.target.value)}
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="filter-group">
        <select
          value={filters.completed}
          onChange={(e) => handleFilterChange('completed', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="false">Active</option>
          <option value="true">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
        >
          <option value="createdAt">Sort by Date</option>
          <option value="title">Sort by Title</option>
          <option value="priority">Sort by Priority</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>
      </div>

      <div className="filter-group">
        <select
          value={filters.sortOrder}
          onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="btn btn-outline btn-sm">
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterBar;