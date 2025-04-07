import React, { useState } from 'react';
import { updateUserProfile, uploadProfilePicture } from '../utils/api';
import { getAuth, PhoneAuthProvider, reauthenticateWithPhoneNumber, multiFactor } from 'firebase/auth';

function UserProfile() {
  const [user, setUser] = useState({
    userId: '',
    lrn: '',
    name: '',
    email: '',
    password: '',
    profilePicture: '',
    role: '',
    registrationDate: '',
    lastLogin: '',
    preferences: {},
    contactInfo: '',
    bio: '',
    socialMediaLinks: [],
    notifications: {}
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const response = await uploadProfilePicture(user.userId, file);
      setUser({ ...user, profilePicture: response.url });
    }
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(user.userId, user);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleEnrollMFA = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const phoneNumber = window.prompt('Enter your phone number for MFA:');
    const appVerifier = window.recaptchaVerifier;

    try {
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(phoneNumber, appVerifier);
      const verificationCode = window.prompt('Enter the verification code you received:');
      const phoneCredential = PhoneAuthProvider.credential(verificationId, verificationCode);
      await reauthenticateWithPhoneNumber(user, phoneCredential);
      const multiFactorUser = multiFactor(user);
      await multiFactorUser.enroll(phoneCredential, 'Phone number');
      alert('MFA enrollment successful');
    } catch (error) {
      console.error('Error enrolling MFA:', error);
      alert('Failed to enroll MFA');
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <form>
        <label>
          User ID:
          <input type="text" name="userId" value={user.userId} onChange={handleInputChange} disabled />
        </label>
        <label>
          LRN:
          <input type="text" name="lrn" value={user.lrn} onChange={handleInputChange} />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={user.name} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={user.email} onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={user.password} onChange={handleInputChange} />
        </label>
        <label>
          Profile Picture:
          <input type="file" name="profilePicture" onChange={handleProfilePictureUpload} />
        </label>
        <label>
          Role:
          <input type="text" name="role" value={user.role} onChange={handleInputChange} />
        </label>
        <label>
          Registration Date:
          <input type="text" name="registrationDate" value={user.registrationDate} onChange={handleInputChange} disabled />
        </label>
        <label>
          Last Login:
          <input type="text" name="lastLogin" value={user.lastLogin} onChange={handleInputChange} disabled />
        </label>
        <label>
          Preferences:
          <input type="text" name="preferences" value={user.preferences} onChange={handleInputChange} />
        </label>
        <label>
          Contact Information:
          <input type="text" name="contactInfo" value={user.contactInfo} onChange={handleInputChange} />
        </label>
        <label>
          Bio:
          <textarea name="bio" value={user.bio} onChange={handleInputChange}></textarea>
        </label>
        <label>
          Social Media Links:
          <input type="text" name="socialMediaLinks" value={user.socialMediaLinks} onChange={handleInputChange} />
        </label>
        <label>
          Notifications:
          <input type="text" name="notifications" value={user.notifications} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleSave}>Save</button>
        <button type="button" onClick={handleEnrollMFA}>Enroll in MFA</button>
      </form>
    </div>
  );
}

export default UserProfile;
