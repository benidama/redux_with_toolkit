import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import { useRequestPasswordResetMutation } from '../app/api/authApi';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      await requestPasswordReset({ email }).unwrap();
      navigate('/reset-password', { state: { email } });
    } catch (err: any) {
      setError(err.data?.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          
          <Button isLoading={isLoading}>Send OTP</Button>
        </form>
        
        <div className="text-center mt-4">
          <Link to="/sign-in" className="text-indigo-600 hover:text-indigo-500">
            Back to Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;