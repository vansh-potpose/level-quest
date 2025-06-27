'use client';
import Image from "next/image";
import Link from "next/link";
import { BsCoin } from "react-icons/bs";
import { useGame } from "../context/GameContext";
import { usePathname } from "next/navigation";

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

  return (
    <nav className="fixed w-full flex justify-between items-center bg-[#010409] h-16 px-5 border-b-[1px] border-[#3d444d] z-50">
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/icon2.jpg"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="text-white font-semibold text-lg">Your App Name</p>
      </div>

      {/* Middle - Navigation Links */}
      <ul className="flex gap-3 items-center">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`px-3 py-1 border-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200
                ${pathname === item.href
                  ? "border-[#FF8000] text-[#FF8000]"
                  : "border-transparent text-white hover:border-gray-600 hover:text-[#FF8000]"}
              `}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right - User Info */}
      <div className="flex gap-2">
        <div className="flex text-white items-center gap-2 px-5 py-1 rounded-md">
          <BsCoin size={24} className="text-yellow-500 font-bold" />
          <p>{coins}</p>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={user.profilePic}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <p className="text-white text-sm font-medium">{user.name}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;