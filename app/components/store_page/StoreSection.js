import StoreItemWrapper from "./StoreItemWrapper";

export default function StoreSection({
  title,
  items,
  buyItem,
  selectedItemId,
  setSelectedItemId,
  menuRef,
  handleEdit,
  handleDelete,
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
      {items.map(item => (
        <StoreItemWrapper
          key={item.id}
          item={item}
          buyItem={buyItem}
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          menuRef={menuRef}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}