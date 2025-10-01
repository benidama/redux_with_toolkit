import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const SocialMedia = () => {
  const socialLinks = [
    {
      icon: <Facebook />,
      url: 'https://facebook.com',
      classes:
        'bg-[#F8F9FA] p-1 rounded text-sm text-[#1a1a2e] hover:bg-blue-700 hover:text-white',
    },
    {
      icon: '𝕏',
      url: 'https://twitter.com',
      classes:
        'bg-[#F8F9FA] rounded text-2xl w-8 text-center text-[#1a1a2e] hover:bg-blue-700 hover:text-white',
    },
    {
      icon: <Instagram />,
      url: 'https://instagram.com',
      classes:
        'bg-[#F8F9FA] p-1 rounded text-sm text-[#1a1a2e] hover:bg-blue-700 hover:text-white',
    },
    {
      icon: <Linkedin />,
      url: 'https://linkedin.com',
      classes:
        'bg-[#F8F9FA] p-1 rounded text-sm text-[#1a1a2e] hover:bg-blue-700 hover:text-white',
    },
  ];
  return (
    <div className="flex gap-2 font-poppins">
      {socialLinks.map((item, index) => (
        <Link key={index} to={item.url} className={item.classes}>
          {item.icon}
        </Link>
      ))}
    </div>
  );
};

export default SocialMedia;