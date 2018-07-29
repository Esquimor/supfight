export default class Player {
  constructor (life, x, y) {
    this.life = life
    this.x = x
    this.y = y
  }

  getLife () {
    return this.life
  }

  getX () {
    return this.x
  }

  getY () {
    return this.y
  }

  forward () {
    this.x += 10
  }

  downard () {
    this.x -= 10
  }

  jump () {
    for (var i = 0; i <= 100; i++) {
      this.y = i
    }
    for (i; i >= 0; i--) {
      this.y = i
    }
  }

  punch () {
    this.life -= 5
  }

  kick () {
    this.life -= 7
  }

  specialAttack () {
    this.life -= 10
  }
}
