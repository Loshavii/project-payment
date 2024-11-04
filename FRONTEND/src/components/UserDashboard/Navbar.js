import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Navbar.css'; // CSS file for the navbar styling

function Navbar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      {/* Left-aligned Logo */}
      <div className="navbar-logo">
        <Link to="/">Fitaybl</Link>
      </div>

      {/* Centered Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/contacts">Contacts</Link></li>
        <li><Link to="/shop">Shop</Link></li>
      </ul>

      {/* Right-aligned Profile Button */}
      <div className="navbar-button">
        <Link to="/profile">
          <button className="profile-btn">Profile</button>
        </Link>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
