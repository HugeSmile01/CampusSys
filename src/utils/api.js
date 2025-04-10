import axios from 'axios';

const API_BASE_URL = 'https://api.campussys.com';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const checkDuplicateLRN = async (lrn) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/check-lrn`, { params: { lrn } });
    return response.data.exists;
  } catch (error) {
    console.error('Check LRN error:', error);
    throw error;
  }
};

export const mergeAccounts = async (lrn, name) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/merge-accounts`, { lrn, name });
    return response.data;
  } catch (error) {
    console.error('Merge accounts error:', error);
    throw error;
  }
};

export const getPosts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error('Get posts error:', error);
    throw error;
  }
};

export const addPost = async (post) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/posts`, post);
    return response.data;
  } catch (error) {
    console.error('Add post error:', error);
    throw error;
  }
};

export const updatePost = async (post) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/posts/${post.id}`, post);
    return response.data;
  } catch (error) {
    console.error('Update post error:', error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Delete post error:', error);
    throw error;
  }
};

export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notifications`);
    return response.data;
  } catch (error) {
    console.error('Get notifications error:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notificationId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/notifications/${notificationId}/read`);
    return response.data;
  } catch (error) {
    console.error('Mark notification as read error:', error);
    throw error;
  }
};

export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId, profileData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, profileData);
    return response.data;
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
};

export const uploadProfilePicture = async (userId, file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/users/${userId}/profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Upload profile picture error:', error);
    throw error;
  }
};

export const getCalendarEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/calendar/events`);
    return response.data;
  } catch (error) {
    console.error('Get calendar events error:', error);
    throw error;
  }
};

export const addCalendarEvent = async (event) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/calendar/events`, event);
    return response.data;
  } catch (error) {
    console.error('Add calendar event error:', error);
    throw error;
  }
};

export const updateCalendarEvent = async (event) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/calendar/events/${event.id}`, event);
    return response.data;
  } catch (error) {
    console.error('Update calendar event error:', error);
    throw error;
  }
};

export const deleteCalendarEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/calendar/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Delete calendar event error:', error);
    throw error;
  }
};

export const getEvents = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`);
    return response.data;
  } catch (error) {
    console.error('Get events error:', error);
    throw error;
  }
};

export const addEvent = async (event) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events`, event);
    return response.data;
  } catch (error) {
    console.error('Add event error:', error);
    throw error;
  }
};
