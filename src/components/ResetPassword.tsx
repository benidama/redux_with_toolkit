import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import { useResetPasswordMutation } from '../app/api/authApi';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ token?: string; password?: string }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    
    if (!token) errs.token = 'Reset token is required';
    if (!password) errs.password = 'New password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await resetPassword({ token, password }).unwrap();
      navigate('/sign-in');
    } catch (err: any) {
      setErrors({ token: err.data?.message || 'Failed to reset password' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Reset Password</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            value={email}
            disabled
          />
          
          <Input
            label="Reset Token"
            type="text"
            placeholder="Enter reset token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            error={errors.token}
          />
          
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            showToggle
          />
          
          <Button isLoading={isLoading}>Reset Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;