import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from './Input';
import Button from './Button';
import GoogleSignInButton from './GoogleSignInButton';
import { useRegisterMutation } from '../app/api/authApi';
import { setCredentials } from '../app/feature/authSlice';

const CreateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Client'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email format';
    if (!formData.phone.trim()) errs.phone = 'Phone is required';
    if (!formData.password) errs.password = 'Password is required';
    else if (formData.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    
    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData).unwrap();
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err: any) {
      console.error('Registration error:', err);
      console.error('Error data:', err.data);
      console.error('Error status:', err.status);
      setErrors({ general: err.data?.message || 'Registration failed' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8">
        <div>
          <h2 className="text-3xl font-bold text-center text-gray-900">Create Account</h2>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange('name')}
            error={errors.name}
          />
          <Input
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange('email')}
            error={errors.email}
          />
          <Input
            label="Phone Number"
            type="tel"
            inputMode="tel"
            placeholder="+250 78 123 4567"
            required
            value={formData.phone}
            onChange={handleChange('phone')}
            error={errors.phone}
          />
          <Input
            label="Password"
            type="password"
            required
            showToggle
            value={formData.password}
            onChange={handleChange('password')}
            error={errors.password}
          />
          <Input
            label="Confirm Password"
            type="password"
            required
            showToggle
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            error={errors.confirmPassword}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Client">Client</option>
              <option value="Worker">Worker</option>
              <option value="Leader">Leader</option>
            </select>
          </div>
          {errors.general && <div className="text-red-600 text-sm">{errors.general}</div>}
          <Button type="submit" isLoading={isLoading}>Create Account</Button>
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
          text="Sign up with Google" 
          onClick={() => console.log('Google sign up clicked')}
        />
        
        <div className="text-center mt-4">
          <Link to="/sign-in" className="text-indigo-600 hover:text-indigo-500">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;