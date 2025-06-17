import Image from "next/image";

import { BsCoin } from "react-icons/bs";



const navItems = ["Home", "Quests","Habits","Store", "Workshop","Settings"];

const Navbar = ({ screen, setScreen,coins,user }) => {
  return (
    <nav className="fixed w-full flex justify-between items-center bg-[#010409] h-16 px-5 border-b-[1px] border-[#3d444d]">
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
          <li
            key={item}
            role="button"
            tabIndex={0}
            onClick={() => setScreen(item)}
            className={`px-3 py-1 border-2 rounded-md text-sm font-medium cursor-pointer transition-colors duration-200
              ${
                screen === item
                  ? "border-[#FF8000] text-[#FF8000]"
                  : "border-transparent text-white hover:border-gray-600 hover:text-[#FF8000]"
              }`}
          >
            {item}
          </li>
        ))}
      </ul>

      {/* Right - User Info */}
      <div className="flex gap-2">
        <div className="flex items-center gap-2  px-5    py-1 rounded-md">
            <BsCoin size={24}  className="text-yellow-500 font-bold"/>
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
