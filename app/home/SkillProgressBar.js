import ProgressBar from "../components/ProgressBar";

const SkillProgressBar = ({ skill, level, value,getMaxSkillPoints }) => {
  
  const xpNeeded = getMaxSkillPoints(level);
  return (   
    <div className="mb-5">
      <div className="flex justify-between text-sm  mb-1 font-medium tracking-wide ">
        <span className="capitalize text-[#f0f6fc]">{skill}</span>
        <span className="flex flex-row  items-center gap-4 text-[#9198a1] ">

          <span className="text-white font-medium">LVL {level} </span> <span className="text-sm">{value}/{xpNeeded}</span>
        </span>
      </div>
      <ProgressBar value={(value/xpNeeded)*100} color="bg-[#0090FF]" h="h-1 sm:h-2 rounded-none" />
    </div>
  );
};

export default SkillProgressBar;
