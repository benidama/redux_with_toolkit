import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from './Input';
import Button from './Button';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [errors, setErrors] = useState<{ otp?: string; newPassword?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    
    if (!otp) errs.otp = 'OTP is required';
    if (!newPassword) errs.newPassword = 'New password is required';
    else if (newPassword.length < 6) errs.newPassword = 'Password must be at least 6 characters';
    
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsLoading(true);
    // Mock password reset - replace with actual API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/sign-in');
    }, 1000);
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
            label="OTP"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            error={errors.otp}
          />
          
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={errors.newPassword}
            showToggle
          />
          
          <Button isLoading={isLoading}>Reset Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;