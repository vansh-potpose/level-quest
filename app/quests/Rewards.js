import { BsCoin } from "react-icons/bs";
import { IoCube } from "react-icons/io5";
import { FaHeart, FaStar,FaAward } from "react-icons/fa";
export default function Rewards({rewards}) {
    return (    <div className="flex gap-2 sm:gap-3 md:gap-5 items-center font-semibold flex-wrap">
                    {rewards.map((reward, index) => (
                      <div key={index} className="flex">
                        {reward.type === "coins" && (
                          <span className="flex gap-1 text-xs sm:text-sm md:text-md items-center">
                            +{reward.data.amount}
                            <BsCoin size={16} className="text-yellow-500 sm:w-5 sm:h-5" />
                          </span>
                        )}
                        {reward.type === "experience" && (
                          <span className="flex gap-1 text-xs sm:text-sm md:text-md items-center text-blue-400">
                            +{reward.data.amount}             
                            <FaStar  className="text-blue-400 mb-1" />
                            
                          </span>
                        )}
                        {reward.type === "skill" && (
                          <span className="flex gap-1 text-xs sm:text-sm md:text-md items-center text-green-400">
                            +{reward.data.amount} 
                                        <FaAward  className="text-green-400 " />

                            {reward.data.skill}
                          </span>
                        )}
                        {reward.type === "item" && (
                            <span className="flex gap-1 text-xs sm:text-sm items-center">
                          <IoCube size={16} className="text-blue-600 sm:w-5 sm:h-5" /> {reward.data.item.name}
                        </span>
                        )}
                      </div>
                    ))}
                  </div>
                );
}