export class Item {
  constructor(item, onClaim) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.price = item.price;
    this.image = item.image;
    this.type = item.type; // "Magical Item" or "object"
    this.amount = item.amount || 1; // default is 1
    this.claimed = false;
    this.attribute_name = item.attribute_name; // can be null
    this.onClaim = onClaim; // function to call when item is claimed
  }

  claim() {
    if (this.claimed) {
      console.warn(`Item "${this.name}" is already claimed.`);
      return;
    }

    switch (this.type) {
      case "Magical Item":
          this.onClaim(this.attribute_name, this.amount);
          this.claimed = true;
        
        break;

      case "Object":
        this.onClaim(`Object "${this.name}" claimed!`);
        this.claimed = true;
        break;

      default:
        console.warn(`Unknown item type: ${this.type}`);
    }
  }
}

export default Item;
