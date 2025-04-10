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
            <li><a href="calendar.html">Calendar Planner</a></li>
            <li><a href="newsfeed.html">Newsfeed</a></li>
            <li><a href="resources.html">Resources</a></li>
            <li><a href="account.html">Account</a></li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;
