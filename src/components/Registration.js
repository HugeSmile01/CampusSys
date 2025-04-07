import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { checkDuplicateLRN, mergeAccounts } from '../utils/api';

function Registration() {
  const [lrn, setLrn] = useState('');
  const [name, setName] = useState('');
  const [uniqueId, setUniqueId] = useState('');
  const [error, setError] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!captchaToken) {
      setError('Please complete the CAPTCHA.');
      return;
    }

    try {
      const isDuplicate = await checkDuplicateLRN(lrn);
      if (isDuplicate) {
        const merge = window.confirm('LRN already exists. Do you want to merge your account with the existing one?');
        if (merge) {
          await mergeAccounts(lrn, name);
          setUniqueId(uuidv4());
        } else {
          setError('Registration cancelled.');
        }
      } else {
        setUniqueId(uuidv4());
        // Save the new user data to the database
      }
    } catch (err) {
      setError('An error occurred during registration. Please try again.');
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <div className="registration">
      <h2>Registration</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="lrn">LRN:</label>
          <input
            type="text"
            id="lrn"
            value={lrn}
            onChange={(e) => setLrn(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="captcha">CAPTCHA:</label>
          <input
            type="text"
            id="captcha"
            value={captchaToken}
            onChange={(e) => handleCaptchaChange(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {uniqueId && <p>Your unique ID: {uniqueId}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Registration;
