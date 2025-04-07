import React, { useState, useEffect } from 'react';

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = (e) => {
    if (e.key === 'Escape' || (e.type === 'click' && !e.target.closest('.menu'))) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', closeMenu);
      document.addEventListener('click', closeMenu);
    } else {
      document.removeEventListener('keydown', closeMenu);
      document.removeEventListener('click', closeMenu);
    }

    return () => {
      document.removeEventListener('keydown', closeMenu);
      document.removeEventListener('click', closeMenu);
    };
  }, [isOpen]);

  return (
    <div className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleMenu} className="hamburger-button">
        ☰
      </button>
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
    </div>
  );
}

export default HamburgerMenu;
