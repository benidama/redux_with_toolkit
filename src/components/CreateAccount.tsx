import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import Button from './Button';
import GoogleSignInButton from './GoogleSignInButton';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Create account:', formData);
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
          />
          <Input
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange('email')}
          />
          <Input
            label="Phone Number"
            type="tel"
            inputMode="tel"
            placeholder="+250 78 123 4567"
            required
            value={formData.phone}
            onChange={handleChange('phone')}
          />
          <Input
            label="Password"
            type="password"
            required
            showToggle
            value={formData.password}
            onChange={handleChange('password')}
          />
          <Input
            label="Confirm Password"
            type="password"
            required
            showToggle
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
          />
          <Button type="submit">Create Account</Button>
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