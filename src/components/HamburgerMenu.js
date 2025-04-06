import React, { useState } from 'react';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu">
      <button onClick={toggleMenu} className="hamburger-button">
        ☰
      </button>
      {isOpen && (
        <nav className="menu">
          <ul>
            <li><a href="#calendar">Calendar Planner</a></li>
            <li><a href="#newsfeed">Newsfeed</a></li>
            <li><a href="#registration">Registration</a></li>
            <li><a href="#login">Login</a></li>
            <li><a href="#profile">Profile</a></li>
            <li><a href="#notifications">Notifications</a></li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;
