'use client';
import { use, useEffect, useRef, useState } from "react";
import { BsCoin } from "react-icons/bs";
import { FaHeart, FaStar, FaAward } from "react-icons/fa";

export default function ItemImage({
  item
}) {
  const [expanded, setExpanded] = useState(true);



  return (
    <div
      className={`relative rounded-lg min-w-64  transition-all duration-500 ease-in-out 
           bg-[#1e2836] rounded-b-none z-50
        `}
    >
      <div className="rounded-md  overflow-hidden mb-2">
        <img
          src={item.image}
          alt={item.name}
          className="w-full z-0 h-48 object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center p-3">
        <div className="text-center text-sm font-semibold">{item.name}</div>
      </div>

      <div className="absolute flex items-center gap-1 top-2 right-2 bg-black/80 px-2 py-1 rounded text-xs">
        {item.price} <BsCoin className="inline-block text-yellow-400" />
      </div>

      {/* Smooth popup expanded content */}
      <div
        className={`grid z-50 absolute w-full  transition-all  duration-400 ease-in-out  rounded-b-lg   max-h-48 opacity-100 px-4 pb-4 bg-[#1e2836] -translate-y-[1px]  overflow-hidden`}
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
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded text-sm font-semibold"
        >
          Buy
        </button>
      </div>


    </div>
  );
}
