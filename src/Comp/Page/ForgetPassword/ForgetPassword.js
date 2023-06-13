import React, { useState } from 'react';
import { auth, sendPasswordResetEmail } from 'firebase/auth'
import { getAuth } from 'firebase/auth';
import app from '../../../firebase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
const auth = getAuth(app)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent
        setMessage('Password reset email sent. Please check your inbox.');
      })
      .catch((error) => {
        // Error sending password reset email
        setMessage('Error sending password reset email.');
        console.error('Reset password error:', error);
      });
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleResetPassword}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
