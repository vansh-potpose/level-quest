import Image from "next/image";
import ProgressBar from "../components/ProgressBar";

const ProfileInfo = ({ user ,getMaxHealthForLevel,getMaxExpForLevel }) => {
 
  const xpNeeded = getMaxExpForLevel(user.level) ;
  const maxHealth = getMaxHealthForLevel(user.level);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-80 h-80 rounded-full border border-[#3d444d] overflow-hidden flex items-center justify-center">
        <Image
          src={user.profilePic || "/book2.jpg"}
          alt={`${user.name}'s Profile Picture`}
          fill
          className="object-cover rounded-full"
          sizes="320px"
          priority
        />
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
