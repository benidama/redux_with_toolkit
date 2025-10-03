import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SocialMedia from './SocialMedia';
import Button from './Button';
import Input from './Input';

const Footer = () => {
  const year = new Date().getFullYear();
  const services = [
    'Find Salons',
    'Browse Service',
    'Book Appointment',
    'Manage Account',
    'Write Reviews',
  ];
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSuccess('You are successfully subscribed!');
      setLoading(false);
      setEmail('');
    }, 1000);
  };

  // Clear success message after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <footer className="w-full bg-[#555555] text-[#E6E6FA] space-y-10 px-4 py-10 font-poppins">
      <div className="max-w-6xl mx-auto flex flex-col  md:flex-row space-y-5 sm:space-y-5 md:space-y-1 md:justify-between">
        <div className="flex flex-col gap-3 md:max-w-sm">
          <h2 className="text-xl font-bold">Salon-Flow</h2>
          <p className="text-sm max-w-[290px]">
            The premier platform connecting clients with top salons in their
            area. Find, book, and enjoy salon services with ease.
          </p>
          <SocialMedia />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold">For Clients</h2>
          <div className="flex flex-col text-sm gap-1">
            {services.map((service, id) => (
              <Link
                key={id}
                className="hover:text-[#17a2b8] hover:underline"
                to="*"
              >
                {service}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 md:max-w-xs">
          <h2 className="text-xl font-bold">Contact Us</h2>
          <p className="text-sm max-w-[270px]">
            123 Platform Ave, Suite 200, San Francisco, CA 94107
          </p>
          <p className="text-sm">(555) 123-4567</p>
          <p className="text-sm">info@salonflow.com</p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 px-2 sm:px-2 md:p-0.5 w-full md:w-auto">
        <p className="text-[#E6E6FA] md:text-lg text-sm">
          Send me tips, trends, updates & offers
        </p>
        {error && (
          <p className="text-red-500 text-sm text-left mb-3">{error}</p>
        )}
        {success && (
          <p className="text-green-500 text-sm text-left mb-3">{success}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg w-full max-w-md"
        >
          <div className="flex-1">
            <Input
              label=""
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="sm:w-auto w-full">
            <Button type="submit">{loading ? 'Loading...' : 'Subscribe'}</Button>
          </div>
        </form>
      </div>
      <div className="text-center text-sm px-4">
        <p>
          SalonFlow is part of SalonFlow Inc, the leading online platform for
          salon booking and time-saving services.
        </p>
        <p className="mt-1">
          Copyright &copy; {year} SalonFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;