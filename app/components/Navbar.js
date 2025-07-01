'use client';
import Image from "next/image";
import Link from "next/link";
import { BsCoin } from "react-icons/bs";
import { useGame } from "../context/GameContext";
import { usePathname, useRouter } from "next/navigation";
import auth from "../appwrite/auth";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Quests", href: "/quests" },
  { name: "Habits", href: "/habits" },
  { name: "Store", href: "/store" },
  { name: "Workshop", href: "/workshop" },
  { name: "Settings", href: "/settings" },
];

const Navbar = () => {
  const { user, coins } = useGame();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await auth.logout();
    router.push("/login");
  };

  return (
    <nav className="fixed w-full flex justify-between items-center bg-[#010409] h-16 px-5 border-b-[1px] border-[#3d444d] z-50">
        <div className="flex gap-2">

        {/* Hamburger for mobile */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
            >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
   
        <div className="flex items-center gap-2">
          <Image
            src="/icon2.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]"
          />
          <p className="text-white font-semibold text-lg hidden md:block">Your App Name</p>
        </div>

            </div>

        {/* Middle - Navigation Links */}
      <ul
        className={`sm:flex gap-3 items-center transition-all duration-300
          ${menuOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-[#010409] border-b border-[#3d444d] py-4 z-40' : 'hidden'}
          sm:static sm:bg-transparent sm:border-none sm:py-0 sm:z-auto
        `}
      >
        {navItems.map((item) => (
          <li key={item.name} className="w-full sm:w-auto">
            <Link
              href={item.href}
              className={`block  px-2 py-1 md:px-3 md:py-2 border-2 rounded-md  text-xs md:text-sm font-medium cursor-pointer transition-colors duration-200 text-center
                ${pathname === item.href
                  ? "border-[#FF8000] text-[#FF8000]"
                  : "border-transparent text-white hover:border-gray-600 hover:text-[#FF8000]"}
              `}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right - User Info */}
      <div className="flex gap-2 items-center">
        <div className="flex text-white items-center gap-2 px-3 py-1 rounded-md bg-transparent">
          <BsCoin size={24} className="text-yellow-500 font-bold" />
          <p className="hidden xs:block">{coins}</p>
        </div>
        <div className="group flex items-center gap-2 relative">
          <Image
            src={user.profilePic}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <p className="text-white text-sm font-medium hidden md:block">{user.name}</p>
          <div className="group-hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out absolute top-14 border border-[#3d444d] right-0  bg-[#0d1117] rounded-md  flex items-center justify-center">
            <button className="w-full h-full rounded-md my-2 mx-3 bg-red-500 px-3 py-1" onClick={handleLogout} title="Logout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;