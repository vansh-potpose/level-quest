import { useState, useRef, useEffect } from "react";
import StoreSection from "./StoreSection";

export default function StorePage({ StoreItems, buyItem }) {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => { 
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest(".store-item-card")
      ) {
        setSelectedItemId(null);
      }
    }
    document.addEventListener("contextmenu", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("contextmenu", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleEdit(item) {
    // Implement edit logic here
    setSelectedItemId(null);
    alert(`Edit: ${item.name}`);
  }

  function handleDelete(item) {
    // Implement delete logic here
    setSelectedItemId(null);
    alert(`Delete: ${item.name}`);
  }

  return (
    <div className="min-h-screen text-white py-10 px-24">
      <h1 className="text-3xl font-bold text-center mb-8">Store</h1>
      <StoreSection
        title="Store"
        items={StoreItems.filter(item => item.type !== "Magical Item")}
        buyItem={buyItem}
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
        menuRef={menuRef}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <h1 className="text-3xl font-bold text-center mt-20 mb-8">Magical Items</h1>
      <StoreSection
        title="Magical Items"
        items={StoreItems.filter(item => item.type === "Magical Item")}
        buyItem={buyItem}
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId}
        menuRef={menuRef}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}