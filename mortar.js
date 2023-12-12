class Mortar {
  constructor({ damage, hp }) {
    this.damage = damage;
    this.hp = hp;
  }

  shoot() {}
}

class Mortira extends Mortar {
  constructor() {
    super({ damage: 500, hp: 50 });

    this.fireball = true;
  }

  getDamage() {
    this.damage;
  }
}
