<template>
  <div>
    <div
      id="Nom"
      v-if="player">
      <div>{{ player.player1.name }} {{ player1.life }}</div>
      <div>{{ player.player2.name }} {{ player2.life }}</div>
    </div>
    <h1>{{ winner }}</h1>
    <div
      id="fight"
      @keydown="kick"
      @keypress="move">
      <div
        id="player1"
        :class="classPlayer1"
        :style="{left: player1.left +'px',
                 animationName: player1.animation,
                 animationDuration: player1.time + 's'}"/>
      <div
        id="player2"
        :class="classPlayer2"
        :style="{left: player2.left +'px',
                 animationName: player2.animation,
                 animationDuration: player2.time + 's'}"/>
    </div>
    <div id="controle">
      <div>Utiliser les fléches directionnelles pour vous diriger</div>
      <div>Coup de poing: A</div>
      <div>Super coup: Z</div>
      <div>Coup de pied: E</div>
      <div>Bloquer: R</div>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      socket: io('localhost:3000/games', {
        query: {token: localStorage.getItem('token')}
      }),
      winner: '',
      action: true,
      player: {
        player1: {
          nom: ''
        },
        player2: {
          nom: ''
        }
      },
      player1: {
        backgroundColor: '#550055',
        left: 10,
        animation: '',
        time: 1,
        life: 100,
        bas: false,
        punchStart: false,
        punch: false,
        legStart: false,
        leg: false,
        superStart: false,
        super: false,
        blockUp: false,
        blockDown: false
      },
      player2: {
        backgroundColor: '#003333',
        left: 440,
        animation: '',
        time: 1,
        life: 100,
        bas: false,
        punchStart: false,
        punch: false,
        legStart: false,
        leg: false,
        superStart: false,
        super: false,
        blockUp: false,
        blockDown: false
      }
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  methods: {
    winnerCalc: function () {
      if (this.player1.life <= 0) {
        this.winner = 'Player 2'
        if (localStorage.getItem('player') === '2') {
          this.socket.emit('WINNER', {
            player: localStorage.getItem('player'),
            id: this.id
          })
        }
      } else if (this.player2.life <= 0) {
        this.winner = 'Player 1'
        if (localStorage.getItem('player') === '1') {
          this.socket.emit('WINNER', {
            player: localStorage.getItem('player'),
            id: this.id
          })
        }
      }
    },
    kick: function (e) {
      if (this.action === true) {
        if ((e.keyCode === 40) && (e.keyCode === 82)) {
          this.socket.emit('BLOCKBAS', {
            player: localStorage.getItem('player'),
            id: this.id
          })
        } else {
          switch (e.keyCode) {
            case 38:
              this.socket.emit('UP', {
                player: localStorage.getItem('player'),
                id: this.id
              })
              this.action = false
              break
            case 40:
              console.log('d')
              this.socket.emit('DOWN', {
                player: localStorage.getItem('player'),
                id: this.id
              })
              this.action = false
              break
            case 65:
              this.socket.emit('PUNCH', {
                player: localStorage.getItem('player'),
                id: this.id
              })
              this.action = false
              break
            case 69:
              this.socket.emit('LEG', {
                player: localStorage.getItem('player'),
                id: this.id
              })
              this.action = false
              break
            case 82:
              console.log('b')
              this.socket.emit('BLOCK', {
                player: localStorage.getItem('player'),
                id: this.id
              })
              this.action = false
              break
            case 90:
              this.socket.emit('SUPER', {
                player: localStorage.getItem('player'),
                id: this.id
              })
              this.action = false
              break
            case 37:
              this.socket.emit('LEFT', {
                player: localStorage.getItem('player'),
                id: this.id
              })
              break
            case 39:
              this.socket.emit('RIGHT', {
                player: localStorage.getItem('player'),
                id: this.id
              })
              break
            default:
          }
        }
      }
    },
    move: function (e) {
      if (this.focusBool === true) {
        switch (e.keyCode) {
        }
      }
    }
  },
  computed: {
    classPlayer1: function () {
      return {
        'punch-start': this.player1.punchStart,
        'punch': this.player1.punch,
        'player': true,
        'bas': this.player1.bas,
        'leg-start': this.player1.legStart,
        'leg': this.player1.leg,
        'block-up': this.player1.blockUp,
        'block-down': this.player1.blockDown,
        'super-start': this.player1.superStart,
        'super': this.player1.super
      }
    },
    classPlayer2: function () {
      return {
        'punch-start': this.player2.punchStart,
        'punch': this.player2.punch,
        'player': true,
        'bas': this.player2.bas,
        'leg-start': this.player2.legStart,
        'leg': this.player2.leg,
        'block-up': this.player2.blockUp,
        'block-down': this.player2.blockDown,
        'super-start': this.player2.superStart,
        'super': this.player2.super
      }
    }
  },
  mounted () {
    this.socket.on('START', (data) => {
      if (data.fight.player1 === localStorage.getItem('id')) {
        localStorage.setItem('player', 1)
      } else if (data.fight.player2 === localStorage.getItem('id')) {
        localStorage.setItem('player', 2)
      }
      this.player = data.fight
      this.player1.left = data.fight.x1
      this.player2.left = data.fight.x2
      this.player1.life = data.fight.life1
      this.player2.life = data.fight.life2
    })
    this.socket.on('END', (data) => {
      setTimeout(function () {
        this.$router.push('/wait')
      }.bind(this), 3000)
    })
    this.socket.on('HORIZON', (data) => {
      if (data.player === '1') {
        this.player1.left = data.x
      } else if (data.player === '2') {
        this.player2.left = data.x
      }
    })
    this.socket.on('UP', (data) => {
      if (data.player === '1') {
        this.player1.animation = 'up'
        this.player1.time = 1
        setTimeout(function () {
          this.player1.animation = ''
          this.action = true
        }.bind(this), 1000)
      } else if (data.player === '2') {
        this.player2.animation = 'up'
        this.player2.time = 1
        setTimeout(function () {
          this.player2.animation = ''
          this.action = true
        }.bind(this), 1000)
      }
    })
    this.socket.on('DOWN', (data) => {
      if (data.player === '1') {
        this.player1.bas = true
        this.player1.time = 1
        setTimeout(function () {
          this.player1.bas = false
          this.action = true
        }.bind(this), 1000)
      } else if (data.player === '2') {
        this.player2.bas = true
        this.player2.time = 1
        setTimeout(function () {
          this.player2.bas = false
          this.action = true
        }.bind(this), 1000)
      }
    })
    this.socket.on('PUNCH_START', (data) => {
      if (data.player === '1') {
        this.player1.punchStart = true
        this.player1.time = 0.5
        setTimeout(function () {
          this.player1.punchStart = false
          this.action = true
        }.bind(this), 500)
      } else if (data.player === '2') {
        this.player2.punchStart = true
        this.player2.time = 0.5
        setTimeout(function () {
          this.player2.punchStart = false
          this.action = true
        }.bind(this), 500)
      }
    })
    this.socket.on('PUNCH', (data) => {
      if (data.player === '1') {
        this.player1.punch = true
        this.player1.time = 1
        this.action = false
        setTimeout(function () {
          this.player1.punch = false
          this.player2.life = data.life
          this.action = true
          this.winnerCalc()
        }.bind(this), 1000)
      } else if (data.player === '2') {
        this.player2.punch = true
        this.player2.time = 1
        this.action = false
        setTimeout(function () {
          this.player2.punch = false
          this.player1.life = data.life
          this.action = true
          this.winnerCalc()
        }.bind(this), 1000)
      }
    })
    this.socket.on('LEG_START', (data) => {
      if (data.player === '1') {
        this.player1.legStart = true
        this.player1.time = 0.5
        setTimeout(function () {
          this.player1.legStart = false
          this.action = true
        }.bind(this), 500)
      } else if (data.player === '2') {
        this.player2.legStart = true
        this.player2.time = 0.5
        setTimeout(function () {
          this.player2.legStart = false
          this.action = true
        }.bind(this), 500)
      }
    })
    this.socket.on('LEG', (data) => {
      if (data.player === '1') {
        this.player1.leg = true
        this.player1.time = 1
        this.action = false
        setTimeout(function () {
          this.player1.leg = false
          this.player2.life = data.life
          this.action = true
          this.winnerCalc()
        }.bind(this), 1000)
      } else if (data.player === '2') {
        this.player2.leg = true
        this.player2.time = 1
        this.action = false
        setTimeout(function () {
          this.player2.leg = false
          this.player1.life = data.life
          this.action = true
          this.winnerCalc()
        }.bind(this), 1000)
      }
    })
    this.socket.on('BLOCK', (data) => {
      if (data.player === '1') {
        this.player1.blockUp = true
        this.player1.time = 1
        setTimeout(function () {
          this.player1.blockUp = false
          this.action = true
        }.bind(this), 1000)
      } else if (data.player === '2') {
        this.player2.blockUp = true
        this.player2.time = 1
        setTimeout(function () {
          this.player2.blockUp = false
          this.action = true
        }.bind(this), 1000)
      }
    })
    this.socket.on('BLOCKBAS', (data) => {
      if (data.player === '1') {
        this.player1.blockDown = true
        this.player1.time = 1
        setTimeout(function () {
          this.player1.blockDown = false
          this.action = true
        }.bind(this), 1000)
      } else if (data.player === '2') {
        this.player2.blockDown = true
        this.player2.time = 1
        setTimeout(function () {
          this.player2.blockDown = false
          this.action = true
        }.bind(this), 1000)
      }
    })
    this.socket.on('SUPER_START', (data) => {
      if (data.player === '1') {
        this.player1.superStart = true
        this.player1.time = 1
        this.action = false
        setTimeout(function () {
          this.player1.superStart = false
          this.action = true
        }.bind(this), 1500)
      } else if (data.player === '2') {
        this.player2.superStart = true
        this.player2.time = 1
        this.action = false
        setTimeout(function () {
          this.player2.superStart = false
          this.action = true
        }.bind(this), 1500)
      }
    })
    this.socket.on('SUPER', (data) => {
      if (data.player === '1') {
        this.player1.super = true
        this.player1.time = 1
        this.action = false
        setTimeout(function () {
          this.player1.super = false
          this.player2.life = data.life
          this.action = true
          this.winnerCalc()
        }.bind(this), 1000)
      } else if (data.player === '2') {
        this.player2.super = true
        this.player2.time = 1
        this.action = false
        setTimeout(function () {
          this.player2.super = false
          this.player1.life = data.life
          this.action = true
          this.winnerCalc()
        }.bind(this), 1000)
      }
    })
  },
  created: function () {
    window.addEventListener('keydown', this.kick)
    window.addEventListener('keypress', this.move)
    this.socket.emit('JOIN', {
      id: this.id
    })
  },
  destroyed: function () {
    window.removeEventListener('keydown', this.kick)
    window.removeEventListener('keypress', this.move)
  }
}
</script>

<style scoped>
#fight{
  width: 1000px;
  height: 500px;
  background-color: ghostwhite;
  position: relative;
}

.player{
  width: 100px;
  height:200px;
  position: absolute;
  bottom: 0px;
}
</style>
