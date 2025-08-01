import React from 'react';
import { User, LogOut } from 'lucide-react';
import './Navigation.css';

function Navigation({ user }) {
  const handleLogout = () => {
    console.log('Logout clicked');
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-logo">
          <h1>Shread</h1>
        </div>
        
        <div className="nav-user">
          <div className="user-info">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <span className="user-name">{user.name}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;