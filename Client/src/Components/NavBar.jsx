import React, { useState } from 'react';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom'; // Import NavLink
import './CSS/Navbar.css';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="navbar">
      <div className="nav-brand">StockApp</div>
      <div className={`nav-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        ☰
      </div>
      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/stocks" >Stocks</NavLink>
        <NavLink to="/mystocks">My Stocks</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/userhistory">History</NavLink>
        <NavLink to="/logout">LogOut</NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
