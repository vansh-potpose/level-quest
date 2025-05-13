import Image from "next/image";
import ProgressBar from "../ProgressBar";
import ProfileInfo from "./ProfileInfo";

const Dashboard = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">

      <ProfileInfo user={user} />

    </div>
  );
};
export default Dashboard;