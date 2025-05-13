import Image from "next/image";
import ProgressBar from "../ProgressBar";

const Dashboard = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <div className="flex flex-col items-center justify-center">
        <div>
          <div className="w-80 h-80 rounded-full border-[1px] border-[#3d444d] flex items-center justify-center object-fill overflow-hidden">

            <Image
              src={user.profilePic}
              alt="Profile"
              width={10000}
              height={10000}

            />
          </div>
          <p className="text-white text-sm font-bold">{user.name} . LEVEL {user.level}</p>
          <p className="text-white text-sm font-medium">{user.job}</p>
          <div>
            <p className="text-white text-sm font-medium">EXP: {user.exp}</p>
            <p className="text-white text-sm font-medium">Health: {user.health}</p>
            <p className="text-white text-sm font-medium">Coins: {user.coins}</p>
            <ProgressBar value={30} color={"#0090FF"} h="5" />
          </div>   

        </div> 
      </div>

    </div>
  );
};
export default Dashboard;