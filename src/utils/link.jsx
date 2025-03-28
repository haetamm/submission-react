import { FaMedal, FaSearch } from 'react-icons/fa';
import { IoHome } from 'react-icons/io5';
import { urlPage } from './constans';
import { BsDoorOpenFill } from 'react-icons/bs';

export const navItems = [
  {
    name: 'Beranda',
    route: urlPage.HOME,
    icon: IoHome,
  },
  {
    name: 'Pencarian',
    route: urlPage.SEARCH,
    icon: FaSearch,
  },
  {
    name: 'Leaderboard',
    route: urlPage.LEADERBOARD,
    icon: FaMedal,
  },
  {
    name: 'Logout',
    route: '#',
    icon: BsDoorOpenFill,
  },
];
