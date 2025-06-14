import { BsCoin } from "react-icons/bs";
import { IoCube } from "react-icons/io5";
export default function Rewards({rewards}) {
    return (    <div className="flex gap-5 items-center flex-wrap">
                    {rewards.map((reward, index) => (
                      <div key={index} className="flex">
                        {reward.type === "coins" && (
                          <span className="flex gap-1 text-md items-center">
                            <BsCoin size={20} className="text-yellow-500" />
                            {reward.data.amount}
                          </span>
                        )}
                        {reward.type === "experience" && (
                          <span className="flex gap-1 text-md items-center text-blue-300">
                            + {reward.data.amount} exp
                          </span>
                        )}
                        {reward.type === "skill" && (
                          <span className="flex gap-1 text-md items-center text-green-400">
                            + {reward.data.amount} {reward.data.skill}
                          </span>
                        )}
                        {reward.type === "item" && (
                            <span className="flex gap-1 text-sm items-center">
                          <IoCube size={20} className="text-blue-600" /> {reward.data.item.name}
                        </span>
                        )}
                      </div>
                    ))}
                  </div>
                );
}