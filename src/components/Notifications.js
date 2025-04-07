import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../utils/api';
import { useIndexedDB } from '../utils/storage';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { getAll, update } = useIndexedDB('notifications');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const localNotifications = await getAll();
    setNotifications(localNotifications);

    const remoteNotifications = await getNotifications();
    setNotifications(remoteNotifications);
  };

  const markAsRead = async (id) => {
    await markNotificationAsRead(id);
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    await update({ id, read: true });
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
