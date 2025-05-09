import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Make sure to import useNavigate for navigation
import Logo from '../images/logo.jpg';

function Menu1() {
  return (
    <div className="menuContainer">
      <Link to="/">
        <img src={Logo} alt="logo" className="logoIcon" />
      </Link>
    </div>
  );
}

function Menu2() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    alert('Logged out successfully');
    navigate('/login'); 
  };

  return (
    <nav className="menu">
      <ul>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export { Menu1, Menu2 };
