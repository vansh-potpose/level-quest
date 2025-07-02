'use client';
import Image from "next/image";
import Link from "next/link";
import { BsCoin } from "react-icons/bs";
import { useGame } from "../context/GameContext";
import { usePathname, useRouter } from "next/navigation";
import auth from "../appwrite/auth";
import { useState,useEffect } from "react";
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

   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { // 640px is Tailwind's 'sm'
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Track dropdown visibility
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Hide dropdown when clicking outside
  useEffect(() => {
    if (!dropdownVisible) return;
    const handleClick = (e) => {
      if (!e.target.closest('.profile-group')) setDropdownVisible(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownVisible]);

  return (
    <nav className="fixed w-full flex justify-between items-center bg-[#010409] h-16 px-5 border-b-[1px] border-[#3d444d] z-50">
      <div className="flex gap-2">

        {/* Hamburger for mobile */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white focus:outline-none hover:text-[#FF8000] cursor-pointer"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>

        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <Image
            src="/icon2.jpg"
            alt="Logo"
            width={40}
            height={40}
            className="rounded-full sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]"
          />
          <p className="text-white font-semibold text-lg hidden lg:block">Your App Name</p>
        </div>

      </div>

      {/* Middle - Navigation Links */}
      <ul
        className={`transition-all duration-300
          ${menuOpen ? 'flex flex-col absolute top-16 left-0 w-full bg-[#010409] border-b border-[#3d444d] py-4 z-40 px-2' : 'hidden'}
          sm:flex sm:flex-row sm:static sm:bg-transparent sm:border-none sm:py-0 sm:z-auto gap-3 items-center
        `}
      >
        {navItems.map((item) => (
          <li key={item.name} className="w-full sm:w-auto">
            <Link
              href={item.href}
              className={`block px-2 py-1 md:px-3 md:py-2 border-2 rounded-md text-sm md:text-md font-medium cursor-pointer transition-colors duration-200 text-center
                ${pathname === item.href
                  ? "border-[#FF8000] text-[#FF8000]"
                  : "border-transparent text-white hover:border-gray-600 hover:text-[#FF8000] hover:bg-[#23272f] cursor-pointer"}
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
          {/* Responsive BsCoin size */}
          <span className="block md:hidden">
            <BsCoin size={20} className="text-yellow-500 font-bold" />
          </span>
          <span className="hidden md:block">
            <BsCoin size={24} className="text-yellow-500 font-bold" />
          </span>
          <p className="text-sm  md:text-lg">{coins}</p>
        </div>
        <div
          className="group profile-group flex items-center gap-2 relative cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setDropdownVisible((v) => !v)}
        >
          <Image
            src={user.profilePic}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover sm:w-[40px] sm:h-[40px] w-[28px] h-[28px]"
          />
          <p className="text-white text-sm font-medium hidden md:block">{user.name}</p>
          {/* Mobile dropdown */}
          <div className="block lg:hidden">
            {dropdownVisible && (
              <div className="opacity-100 transition-all duration-500 ease-in-out absolute top-14 border border-[#3d444d] right-0 bg-[#0d1117] rounded-md flex items-center justify-center z-50">
                <button className="w-full h-full rounded-md my-2 mx-3 bg-red-500 px-3 py-1 hover:bg-red-600 cursor-pointer" onClick={handleLogout} title="Logout">Logout</button>
              </div>
            )}
          </div>
          {/* Desktop dropdown */}
          <div className="lg:flex hidden group-hover:opacity-100 opacity-0 transition-all duration-500 ease-in-out absolute top-14 border border-[#3d444d] right-0 bg-[#0d1117] rounded-md items-center justify-center">
            <button className="w-full h-full rounded-md my-2 mx-3 bg-red-500 px-3 py-1 hover:bg-red-600 cursor-pointer" onClick={handleLogout} title="Logout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;