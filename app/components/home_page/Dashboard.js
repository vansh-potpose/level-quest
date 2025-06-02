import Image from "next/image";
import ProgressBar from "../ProgressBar";
import ProfileInfo from "./ProfileInfo";
import SkillDashboard from "./SkillDashboard";
import InventorySlot from "./InventorySlot";

const Dashboard = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center  h-fit ">
      <div className="flex w-full gap-10 justify-center items-center">

        <ProfileInfo user={user} />
        <SkillDashboard skills={user?.stats} />
      </div>
      <div className="bg-[#0d1117] m-5 p-5 rounded-xl ">
        <div>
          <h1 className="font-bold text-lg text-[#9198a1]">About me : </h1>
          <p className="text-[#f0f6fc] text-md font-medium">{user.about}</p>
        </div>
        <div className="flex flex-col gap-4 mt-6 w-80">
          <h1 className="text-[#f0f6fc] text-md font-medium"> <span className="text-[#9198a1]">Strengths : </span>{user.stregth}</h1>
          <h1 className="text-[#f0f6fc] text-md font-medium"><span className="text-[#9198a1]">Weaknesses : </span>{user.weakness}</h1>
          <h1 className="text-[#f0f6fc] text-md font-medium"><span className="text-[#9198a1]">Master Objective : </span>{user.masterObjective}</h1>
          <h1 className="text-[#f0f6fc] text-md font-medium"><span className="text-[#9198a1]">Minor Objective : </span>{user.minorObjective}</h1>
        </div>
      </div>
      <div className="px-5 mt-10">
      <h1 className="text-3xl font-bold text-[#f0f6fc] mb-9 flex w-ull justify-center">Inventory</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {user.inventory.map((item) => (
          <InventorySlot
            key={item.id}
            item={item}
            />
        ))}

      </div>
        </div>
    </div>
  );
};
export default Dashboard;