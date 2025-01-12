import { FaSearch } from "react-icons/fa"; // Contoh menggunakan react-icons
import { IoHome } from "react-icons/io5";
import { RiSaveFill } from "react-icons/ri";

export const navItems = [
  {
    name: "Beranda",
    route: "/",
    icon: IoHome,
  },
  {
    name: "Arsip",
    route: "/archive",
    icon: RiSaveFill,
  },
  {
    name: "Pencarian",
    route: "/search",
    icon: FaSearch,
  },
];
