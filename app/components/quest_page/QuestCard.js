'use client'
import ProgressBar from "../ProgressBar";
import { BsCoin } from "react-icons/bs";
import { IoCube } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";



export default function QuestCard({ quest, onQuestClick }) {
    const hardborder = "border-[#FF1A00]";
    const mediumborder = "border-[#F9E827]";
    const easyborder = "border-[#3d444d]";
    const completedborder = "border-[#31FB74]";
    return (
        <div onClick={() => onQuestClick(quest)} className={`relative bg-[#0d1117] border-2 ${quest.status == "Completed" ? completedborder : quest.priority == "High" ? hardborder : quest.priority == "Medium" ? mediumborder : easyborder}  rounded-lg shadow-md w-96`}   >
            <div className="h-40 overflow-hidden rounded-t-lg">
                <img src={quest.image} alt={quest.name} className="w-full object-fill rounded-t-md " />
            </div>
            {/* <ProgressBar value={20} /> */}
            <div className="p-4">

                <h2 className="text-lg font-bold text-[#f0f6fc]">{quest.name}</h2>
                <p className="text-sm font-normal text-[#9198a1]">{quest.description}</p>
                <div className="mt-2 flex gap-5 items-start">
                    <div className="min-w-fit  font-semibold">Rewards :</div>
                    <div className="flex gap-5 items-center flex-wrap">

                        {quest.rewards.map((reward, index) => (

                            <div key={index} className="flex ">
                                {reward.type === "coins" && <span className="flex gap-1 text-md items-center "><BsCoin size={20} className="text-yellow-500" />{reward.data.amount}</span>}
                                {reward.type === "experience" && <span className="flex flex-row gap-1 text-md items-center text-blue-300">+ {reward.data.amount} exp</span>}
                                {reward.type === "skill" && <span className="flex gap-1 text-md items-center text-green-400">+ {reward.data.amount} {reward.data.skill}</span>}
                                {reward.type === "item" && <IoCube size={20} className="text-blue-600" />}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
            {quest.status == "Completed" &&

                <div className="absolute  bottom-3   right-3 flex items-center gap-2  text-[#31FB74] rounded-full p-1">
                    DONE
                    <FaCheck />
                </div>
            }
        </div>
    );
}