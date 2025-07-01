import { useEffect, useRef, useState } from "react";
import { BsCoin } from "react-icons/bs";
import { FaHeart, FaStar,FaAward } from "react-icons/fa";


export default function InventorySlot({ item }) {
  const [expanded, setExpanded] = useState(false);
  const cardRef = useRef(null);

  // Handle outside click to collapse
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDoubleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      ref={cardRef}
      onClick={handleDoubleClick}
      className={`relative rounded-lg  transition-all duration-500 ease-in-out 
          ${expanded ? "scale-105 bg-[#1e2836] rounded-b-none z-50" : "z-0"}
        `}
    >
      <div className="relative rounded-md  overflow-hidden mb-2 ">
        <img
          src={item.image}
          alt={item.name}
          className="w-full z-0 h-48 object-cover"
        />
        {item.claimed && (
        <div className="absolute top-0 right-0 bg-black/60 w-full h-full flex items-center justify-center">
          <div className="bg-blue-500/70 rounded-lg p-2">
            Claimed
          </div>
        </div>
)}
      </div>

      <div className="flex flex-col items-center justify-center p-3">
        <div className="text-center text-sm font-semibold">{item.name}</div>
      </div>



      {/* Smooth popup expanded content */}
      <div
        className={`grid z-50 absolute w-full  transition-all  duration-400 ease-in-out  rounded-b-lg   ${expanded
            ? "max-h-48 opacity-100 px-4 pb-4 bg-[#1e2836] -translate-y-[1px] "
            : "max-h-0 opacity-0 px-4 pb-0 "
          } overflow-hidden`}
      >

        <div className="text-gray-300 text-sm mb-2">{item.description}</div>
        {item.type === "Magical Item" && (
                    <div className="text-gray-300 text-sm mb-2 flex items-center gap-2">
                      Gives:&nbsp;
                      {item.attribute_name === "health" ? (
                        <>
                          <span className="font-bold text-red-400">+ {item.amount}</span>
                          <FaHeart className="text-red-400" />
                          <span className="text-xs">HP</span>
                        </>
                      ) : item.attribute_name === "experience" ? (
                        <>
                          <span className="font-bold text-blue-400">+ {item.amount}</span>
                          <FaStar  className="text-blue-400 mb-1" />
                          <span  className="text-xs">XP</span>
                        </>
                      ) : (
                        <>
                          <span className="font-bold text-green-400">+ {item.amount}</span>
                          <FaAward className="text-green-400 " />
                          <span className="text-xs capitalize">{item.attribute_name}</span>
                          
                        </>
                      )}
                    </div>
                  )}
        {!item.claimed && (
        <button
          disabled={item.claimed}
          onClick={() => {
            console.log("Claiming item:", item.name);
            item.claim();
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold"
        >
          Claim
        </button>)}
      </div>


    </div>
  );
}
