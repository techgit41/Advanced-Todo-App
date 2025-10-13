import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './ServerStatus.css';

const ServerStatus = () => {
  const { serverOnline, checkServerStatus } = useAuth();
  const [checking, setChecking] = useState(false);

  const handleCheckStatus = async () => {
    setChecking(true);
    await checkServerStatus();
    setTimeout(() => setChecking(false), 1000);
  };

  if (serverOnline) return null;

  return (
    <div className="server-status offline">
      <div className="status-content">
        <div className="status-indicator"></div>
        <span className="status-message">
          Server offline - Backend not connected
        </span>
        <button 
          onClick={handleCheckStatus} 
          disabled={checking}
          className="retry-btn"
        >
          {checking ? 'Checking...' : 'Retry'}
        </button>
      </div>
    </div>
  );
};

export default ServerStatus;