'use client';
import InventorySlot from "./InventorySlot";
import InventorySlotMenu from "./InventorySlotMenu"; // Use the delete-only menu

export default function InventorySlotWrapper({
    item,
    selectedItemId,
    setSelectedItemId,
    menuRef,
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
                <InventorySlotMenu
                    menuRef={menuRef}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}