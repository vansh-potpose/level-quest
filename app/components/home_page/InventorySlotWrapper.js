'use client';
import StoreItemCard from "./StoreItemCard";
import StoreItemMenu from "./StoreItemMenu";

export default function InventorySlotWrapper({
    item,
    buyItem,
    selectedItemId,
    setSelectedItemId,
    menuRef,
    handleEdit,
    handleDelete,
}) {
    return (
        <div
            className="relative store-item-card"
            onContextMenu={e => {
                e.preventDefault();
                setSelectedItemId(item.id);
            }}
            onMouseDown={() => {
                if (selectedItemId && selectedItemId !== item.id) {
                    setSelectedItemId(null);
                }
            }}
        >
            <InventorySlot
                key={item.id}
                item={item}
            />      
            {selectedItemId === item.id && (
                <StoreItemMenu
                    menuRef={menuRef}
                    onEdit={() => handleEdit(item)}
                    onDelete={() => handleDelete(item)}
                />
            )}
        </div>
    );
}