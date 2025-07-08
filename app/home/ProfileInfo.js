import Image from "next/image";
import ProgressBar from "../components/ProgressBar";

const ProfileInfo = ({ user ,getMaxHealthForLevel,getMaxExpForLevel }) => {
 
  const xpNeeded = getMaxExpForLevel(user.level) ;
  const maxHealth = getMaxHealthForLevel(user.level);

  return (

    <div className="flex flex-col sm:flex-col items-center sm:items-center justify-center w-full">
      <div className="flex flex-row sm:flex-col items-center w-full sm:w-auto">
       
        <div className="hidden sm:flex relative aspect-square w-48 md:w-56 rounded-full border border-[#3d444d] overflow-hidden items-center justify-center">
          <Image
            src={user.profilePic}
            alt={`${user.name}'s Profile Picture`}
            fill
            sizes="(min-width: 640px) 14rem, 100vw"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            className="rounded-full"
            priority
          />
        </div>
       
          <div className="flex sm:hidden relative aspect-square w-20 h-20 rounded-full border border-[#3d444d] overflow-hidden items-center justify-center  sm:ml-0 mt-0 sm:mt-4 shadow-lg bg-[#23272f]">
            <Image
              src={user.profilePic}
              alt={`${user.name}'s Small Profile Picture`}
              width={80}
              height={80}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              className="object-cover rounded-full"
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
