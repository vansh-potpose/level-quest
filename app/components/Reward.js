class Reward {
    
  constructor(type, data) {
    this.type = type;
    this.data = data;
  }

  claim(user) {
    switch (this.type) {
      case 'coins':
        user.coins += this.data.amount;
        break;

      case 'experience':
        user.exp += this.data.amount;
        break;

      case 'skill':
        const skill = user.stats.find(s => s.skill === this.data.skill);
        if (skill) {
          skill.value += this.data.amount;
        }
        break;

      case 'item':
        if (!user.inventory) user.inventory = [];
        user.inventory.push(this.data.item);
        break;

      default:
        console.warn(`Unhandled reward type: ${this.type}`);
    }
  }
}

export default Reward;