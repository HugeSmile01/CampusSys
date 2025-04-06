import React, { useState, useEffect } from 'react';

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the server or local storage
    const fetchNotifications = async () => {
      // Replace with actual API call or local storage retrieval
      const fetchedNotifications = [
        { id: 1, message: 'New event added to your calendar', read: false },
        { id: 2, message: 'New post in the newsfeed', read: false },
      ];
      setNotifications(fetchedNotifications);
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id} className={notification.read ? 'read' : 'unread'}>
            {notification.message}
            {!notification.read && (
              <button onClick={() => markAsRead(notification.id)}>Mark as read</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
