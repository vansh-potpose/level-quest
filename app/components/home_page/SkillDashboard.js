import SkillRadarChart from './SkillRadarChart';
import SkillProgressBar from './SkillProgressBar';

 

const SkillDashboard = ({skills}) => {
  return (
    <div className="w-fit bg-black text-white px-6 py-12 font-orbitron">
         <h2 className="text-[#f0f6fc] border-b  border-[#3d444d] text-md mb-4 font-medium tracking-wider uppercase">
            Skill Points
          </h2>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">

        {/* Radar Chart */}
        <div className="min-w-[450px]">
         
          <SkillRadarChart data={skills} />
        </div>

        {/* Progress Panel */}
        <div className="flex  min-w-[350px] flex-col"> 
          <div className="flex flex-col gap-4 mt-6">
            {skills.map((s, idx) => (
              <SkillProgressBar
                key={idx}
                skill={s.skill}
                level={s.level}
                value={s.value}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDashboard;
