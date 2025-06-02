import { useState } from "react";
import StoreItemCard from "./StoreItemCard";
// import Item from "wherever-your-Item-class-is"; // Make sure to import Item if needed

export default function StorePage({ StoreItems, buyItem }) {



  return (
    <div className="min-h-screen  text-white py-10 px-24">
      <h1 className="text-3xl font-bold text-center mb-8">Store</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5  gap-6">
        {StoreItems.map((item) =>
          item.type === "Magical Item" ? null : (
            <StoreItemCard
              key={item.id}
              item={item}
              onBuy={buyItem}

            />
          )
        )}
      </div>
      <h1 className="text-3xl font-bold text-center mt-20 mb-8">Magical Items</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {StoreItems.map((item) =>
          item.type !== "Magical Item" ? null : (
            <StoreItemCard
              key={item.id}
              item={item}
              onBuy={buyItem}

            />
          )
        )}
      </div>


    </div>
  );
}
