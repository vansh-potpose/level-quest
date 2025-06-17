  import { useEffect, useRef, useState } from "react";
  import { BsCoin } from "react-icons/bs";

  export default function ItemImage({
    item
  }) {
    const [expanded, setExpanded] = useState(true);

    

    return (
      <div
        className={`relative rounded-lg min-w-64  transition-all duration-500 ease-in-out 
          scale-105 bg-[#1e2836] rounded-b-none z-50
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
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded text-sm font-semibold"
          >
            Buy
          </button>
        </div>

      
      </div>
    );
  }
