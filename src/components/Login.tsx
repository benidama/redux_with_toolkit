import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import GoogleSignInButton from '../components/GoogleSignInButton';

interface LoginProps {
  onLogin: (phone: string, password: string) => Promise<void>;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: typeof errors = {};
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

    setIsSubmitting(true);
    try {
      await onLogin(phone.trim(), password);
      // Maybe clear fields or show some success UI
    } catch (err: any) {
      setErrors({ password: err.message || 'Login failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign in</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
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

          <Button isLoading={isSubmitting}>Sign in</Button>
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
