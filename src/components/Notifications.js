import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead } from '../utils/api';
import { useIndexedDB } from '../utils/storage';
import firebase from 'firebase/app';
import 'firebase/messaging';

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { getAll, update } = useIndexedDB('notifications');

  useEffect(() => {
    fetchNotifications();
    initializeFCM();
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

  const initializeFCM = () => {
    const messaging = firebase.messaging();

    messaging
      .requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return messaging.getToken();
      })
      .then((token) => {
        console.log('FCM Token:', token);
        // Send the token to the server to save it for future notifications
      })
      .catch((err) => {
        console.error('Unable to get permission to notify.', err);
      });

    messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      // Update the notifications state with the new notification
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id: payload.data.id, message: payload.notification.body, read: false },
      ]);
    });
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
