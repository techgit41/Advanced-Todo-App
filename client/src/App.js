import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import TodoList from './components/Todos/TodoList';
import TodoForm from './components/Todos/TodoForm';
import Stats from './components/Stats/Stats';
import Profile from './components/User/Profile';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import './App.css';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/todos" element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              } />
              <Route path="/add-todo" element={
                <ProtectedRoute>
                  <TodoForm />
                </ProtectedRoute>
              } />
              <Route path="/edit-todo/:id" element={
                <ProtectedRoute>
                  <TodoForm />
                </ProtectedRoute>
              } />
              <Route path="/stats" element={
                <ProtectedRoute>
                  <Stats />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;