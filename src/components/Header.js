import React, { useState, useEffect } from 'react';

function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Fetch notifications and update unread count
    const fetchNotifications = async () => {
      // Replace with actual API call
      const fetchedNotifications = await getNotifications();
      setNotifications(fetchedNotifications);
      setUnreadCount(fetchedNotifications.filter((n) => !n.read).length);
    };

    fetchNotifications();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality
  };

  return (
    <header className="sticky-header">
      <h1>CampusSys</h1>
      <form onSubmit={handleSearchSubmit} className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <nav>
        <ul>
          <li><a href="#calendar">Calendar Planner</a></li>
          <li><a href="#newsfeed">Newsfeed</a></li>
          <li><a href="#registration">Registration</a></li>
          <li><a href="#login">Login</a></li>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#notifications">Notifications</a></li>
        </ul>
      </nav>
      <div className="user-menu">
        <button className="notification-icon">
          <span className="badge">{unreadCount}</span>
        </button>
        <div className="dropdown-menu">
          <button className="dropdown-toggle">User</button>
          <div className="dropdown-content">
            <a href="#profile">View Profile</a>
            <a href="#settings">Settings</a>
            <a href="#logout">Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
