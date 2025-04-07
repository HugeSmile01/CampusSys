import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

export const login = async (email, password) => {
  try {
    const response = await firestore.collection('users').where('email', '==', email).where('password', '==', password).get();
    if (!response.empty) {
      const user = response.docs[0].data();
      return { success: true, sessionId: user.sessionId };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const checkDuplicateLRN = async (lrn) => {
  try {
    const response = await firestore.collection('users').where('lrn', '==', lrn).get();
    return !response.empty;
  } catch (error) {
    console.error('Check LRN error:', error);
    throw error;
  }
};

export const mergeAccounts = async (lrn, name) => {
  try {
    const response = await firestore.collection('users').where('lrn', '==', lrn).get();
    if (!response.empty) {
      const user = response.docs[0].data();
      await firestore.collection('users').doc(user.id).update({ name });
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error('Merge accounts error:', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await firestore.collection('posts').get();
    return response.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Get posts error:', error);
    throw error;
  }
};

export const addPost = async (post) => {
  try {
    const response = await firestore.collection('posts').add(post);
    return { id: response.id, ...post };
  } catch (error) {
    console.error('Add post error:', error);
    throw error;
  }
};

export const updatePost = async (post) => {
  try {
    await firestore.collection('posts').doc(post.id).update(post);
    return post;
  } catch (error) {
    console.error('Update post error:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    await firestore.collection('posts').doc(postId).delete();
    return { success: true };
  } catch (error) {
    console.error('Delete post error:', error);
    throw error;
  }
};

export const getNotifications = async () => {
  try {
    const response = await firestore.collection('notifications').get();
    return response.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Get notifications error:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    await firestore.collection('notifications').doc(notificationId).update({ read: true });
    return { success: true };
  } catch (error) {
    console.error('Mark notification as read error:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await firestore.collection('users').doc(userId).get();
    return response.data();
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    await firestore.collection('users').doc(userId).update(profileData);
    return profileData;
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};

export const uploadProfilePicture = async (userId, file) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(`profile_pictures/${userId}/${file.name}`);
  await fileRef.put(file);
  const url = await fileRef.getDownloadURL();
  await firestore.collection('users').doc(userId).update({ profilePicture: url });
  return { url };
};

export const getCalendarEvents = async () => {
  try {
    const response = await firestore.collection('calendarEvents').get();
    return response.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Get calendar events error:', error);
    throw error;
  }
};

export const addCalendarEvent = async (event) => {
  try {
    const response = await firestore.collection('calendarEvents').add(event);
    return { id: response.id, ...event };
  } catch (error) {
    console.error('Add calendar event error:', error);
    throw error;
  }
};

export const updateCalendarEvent = async (event) => {
  try {
    await firestore.collection('calendarEvents').doc(event.id).update(event);
    return event;
  } catch (error) {
    console.error('Update calendar event error:', error);
    throw error;
  }
};

export const deleteCalendarEvent = async (eventId) => {
  try {
    await firestore.collection('calendarEvents').doc(eventId).delete();
    return { success: true };
  } catch (error) {
    console.error('Delete calendar event error:', error);
    throw error;
  }
};
