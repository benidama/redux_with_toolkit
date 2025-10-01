import gasabo from '../src/images/gasabo.jpg';
import nyarugenge from '../src/images/Nyar.jpg';
import kicukiro from '../src/images/kickiro.jpg';
import {
  Search,
  CalendarDaysIcon,
  Star,
  Scissors,
  UsersIcon,
  ShoppingBag,
} from 'lucide-react';

export const commonlyQuestionAsked = [
  {
    Question: 'Do salons offer home service?',
    Answer:
      'Some salons do! Look for the Home Service Available tag on the salon’s profile',
  },
  {
    Question: ' Can I cancel or reschedule my appointment?',
    Answer:
      'Yes! You can cancel or reschedule your appointment through your account before the scheduled time.',
  },
  {
    Question: 'How do I find salons near me?',
    Answer:
      'Use our search feature to find salons by district or location and choose the one that fits your needs.',
  },
  {
    Question: 'What types of beauty services are available?',
    Answer:
      'Our partnered salons offer haircuts, styling, coloring, manicures, pedicures, facials, and more!',
  },
];

export const howDetails = [
  {
    id: 1,
    number: '1',
    icon: <Search />,
    title: 'Find Nearby Salons',
    description:
      'Search for salons in your area and browse their services, reviews, and availability',
  },
  {
    id: 2,
    number: '2',
    icon: <CalendarDaysIcon />,
    title: 'Book Your Appointment',
    description:
      'Select your preferred service, date, and time to schedule your appointment.',
  },
  {
    id: 3,
    number: '3',
    icon: <Star />,
    title: 'Enjoy Your Service',
    description:
      'Visit the salon, enjoy your service, and leave a review to help others.',
  },
];

export const serviceDetails = [
  {
    id: 1,
    icon: <Scissors />,
    title: 'Hair Cuts & Styling',
  },
  {
    id: 2,
    icon: <Star />,
    title: 'Colors & Highlights',
  },
  {
    id: 3,
    icon: <UsersIcon />,
    title: 'Treatment and Care',
  },
  {
    id: 4,
    icon: <ShoppingBag />,
    title: 'Beauty Product',
  },
];

export const districtDetails = [
  {
    id: 1,
    image: gasabo,
    title: 'Gasabo District',
    location: 'Kigali, Rwanda',
    TatalSaloons: '45',
  },
  {
    id: 2,
    image: nyarugenge,
    title: 'Nyarugenge District',
    location: 'Kigali, Rwanda',
    TatalSaloons: '45',
  },
  {
    id: 3,
    image: kicukiro,
    title: 'Kicukiro District',
    location: 'Kigali, Rwanda',
    TotalSalons: '45',
  },
];