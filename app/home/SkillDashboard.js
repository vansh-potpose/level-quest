import SkillRadarChart from "./SkillRadarChart";
import SkillProgressBar from "./SkillProgressBar";
import { useEffect, useState } from "react";
import statService from "../backend-services/stat.service";
import { useSelector } from "react-redux";

const SkillDashboard = ({getMaxSkillPoints}) => {
  // const getMaxSkillPoints = () => 100;
  const { user } = useSelector((state) => state.user);
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    statService
      .getUserStats(user._id)
      .then((data) => setSkills(data))
      .catch((err) => console.log(err.message));
  });
  return (
    <div className="w-fit  text-white px-4 sm:px-6 py-12 font-orbitron">
      <h2 className="text-[#f0f6fc] border-b  border-[#3d444d] text-md mb-4 font-medium tracking-wider uppercase">
        Stats
      </h2>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-1 sm:gap-8">
        {/* Radar Chart */}
        <div className="min-w-[320px] sm:min-w-[450px]">
          <SkillRadarChart data={skills} />
        </div>

        {/* Progress Panel */}

        <div className="flex  min-w-[300px]  sm:min-w-[350px] flex-col">
          <div className="flex flex-col gap-1 sm:gap-4 sm:mt-6">
            {skills.map((s, idx) => (
              <SkillProgressBar
                key={idx}
                skill={s.skill}
                level={s.level}
                value={s.value}
                getMaxSkillPoints={getMaxSkillPoints}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDashboard;
