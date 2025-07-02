import Image from "next/image";
import ProgressBar from "../components/ProgressBar";

const ProfileInfo = ({ user ,getMaxHealthForLevel,getMaxExpForLevel }) => {
 
  const xpNeeded = getMaxExpForLevel(user.level) ;
  const maxHealth = getMaxHealthForLevel(user.level);

  return (
    <div className="flex flex-col sm:flex-col items-center sm:items-center justify-center w-full">
      {/* Profile image and info */}
      <div className="flex flex-row sm:flex-col items-center w-full sm:w-auto">
        {/* Profile Image */}
        <div className="relative w-20 h-20 sm:w-80 sm:h-80 rounded-full border border-[#3d444d] overflow-hidden flex items-center justify-center">
          <Image
            src={user.profilePic}
            alt={`${user.name}'s Profile Picture`}
            fill
            className="object-cover rounded-full"
            sizes="80px, (min-width: 640px) 320px"
            priority
          />
        </div>
        {/* Name and Job */}
        <div className="ml-4 sm:ml-0 mt-0 sm:mt-4 text-left sm:text-center">
          <p className="text-white text-lg font-bold">{user.name} • Level {user.level}</p>
          <p className="text-white text-md font-medium">Job: {user.job}</p>
        </div>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-4 mt-4 sm:mt-6  w-full sm:w-80">
        {/* Health */}
        <div className="relative ">
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
