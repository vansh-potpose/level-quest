import Image from "next/image";
import { MdEdit } from "react-icons/md";
import ProgressBar from "../ProgressBar";

const ProfileInfo = ({ user }) => {
  const baseXP = 100;
  const baseHealth = 100;

  const xpNeeded = Math.floor(baseXP * user.level ** 1.5);
  const maxHealth = Math.floor(baseHealth * 1.05 ** user.level);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-80 h-80 rounded-full border border-[#3d444d] overflow-hidden flex items-center justify-center">
        <Image
          src={user.profilePic}
          alt={`${user.name}'s Profile Picture`}
          width={320}
          height={320}
          className="object-cover"
        />
        <div className="absolute bottom-4 right-4 z-50 p-2 bg-[#276fea] rounded-full border border-[#3d444d] cursor-pointer hover:bg-blue-700 transition">
          <MdEdit className="text-white" size={20} />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-white text-lg font-bold">{user.name} • Level {user.level}</p>
        <p className="text-white text-md font-medium">Job: {user.job}</p>
      </div>

      <div className="flex flex-col gap-4 mt-6 w-80">
        {/* Health */}
        <div className="relative">
          <p className="text-white text-md font-medium mb-1">Health</p>
          <p className="absolute top-0 right-0 text-white text-sm font-medium">
            {user.health}/{maxHealth}
          </p>
          <ProgressBar value={(user.health / maxHealth) * 100} color="bg-red-600" h="h-2" />
        </div>

        {/* Experience */}
        <div className="relative">
          <p className="text-white text-md font-medium mb-1">Experience</p>
          <p className="absolute top-0 right-0 text-white text-sm font-medium">
            {user.exp}/{xpNeeded}
          </p>
          <ProgressBar value={(user.exp / xpNeeded) * 100} color="bg-blue-500" h="h-2" />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
