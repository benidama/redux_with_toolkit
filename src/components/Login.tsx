import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { useLoginMutation } from '../app/api/authApi';
import { setCredentials } from '../app/feature/authSlice';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; phone?: string; password?: string }>({});


  const validate = (): boolean => {
    const errs: typeof errors = {};
    
    if (!email) {
      errs.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Invalid email format';
    }
    
    const phonePattern = /^\+?[0-9\s\-()]{6,20}$/;
    if (!phone) {
      errs.phone = 'Phone is required';
    } else if (!phonePattern.test(phone.trim())) {
      errs.phone = 'Invalid phone format';
    }

    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Mock login - replace with actual API call when backend is ready
    const mockResult = { user: { email: email.trim(), phone: phone.trim() }, token: 'mock-token' };
    dispatch(setCredentials(mockResult));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          
          <Input
            label="Phone number"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+250 78 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            error={errors.phone}
          />

          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            showToggle
          />

          <Button isLoading={isLoading}>Sign in</Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>
        
        <GoogleSignInButton 
          text="Sign in with Google" 
          onClick={() => console.log('Google sign in clicked')}
        />
        
        <div className="text-center mt-4">
          <Link to="/create-account" className="text-indigo-600 hover:text-indigo-500">
            Don't have an account? Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
