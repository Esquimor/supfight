<template>
  <div id="player">
    <div
      v-for="(player) in listPlayer"
      :key="player.key">
      <span
        :class="player.status"
        @click="invit(player._id)">Name: {{ player.name }}, Point: {{ player.point }}</span>
    </div>
    {{ info }}
    <div
      id="demande"
      v-if="demande">
      <span>Do you want play with this player {{ invitPlayerName }} ?</span>
      <button @click="resInvit(true, invitPlayerId)">Yes</button>
      <button @click="resInvit(false, invitPlayerId)">No</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data: function () {
    return {
      invitPlayerName: '',
      invitPlayerId: '',
      demande: false,
      info: '',
      listPlayer: [],
      socket: io('localhost:3000/status', {
        query: {token: localStorage.getItem('token')}
      })
    }
  },
  methods: {
    invit (id) {
      if (localStorage.getItem('id') !== id) {
        this.socket.emit('INVIT', {
          player1: localStorage.getItem('id'),
          player2: id
        })
      }
    },
    resInvit (response) {
      this.socket.emit('RES_INVIT', {
        player1: this.invitPlayerId,
        player2: localStorage.getItem('id'),
        res: response
      })
    }
  },
  mounted () {
    this.socket.on('WAITING', (data) => {
      this.listPlayer = data
    })
    this.socket.on('OFFLINE', (data) => {
      this.listPlayer = this.listPlayer.filter(e => e.name !== data)
    })
    this.socket.on('ASK_INVIT', (data) => {
      if (data.player2._id === localStorage.getItem('id')) {
        this.invitPlayerName = data.player1.name
        this.invitPlayerId = data.player1._id
        this.demande = true
      }
    })
    this.socket.on('RES_NEG_INVIT', (data) => {
      if (data.player2 === localStorage.getItem('id')) {
        this.demande = false
      } else if (data.player1 === localStorage.getItem('id')) {
        this.info = 'The player you have choose doesn\'t want to fight against you'
      }
    })
    this.socket.on('RES_POS_INVIT', (data) => {
      if (data.fight.player1 === localStorage.getItem('id') || data.fight.player2 === localStorage.getItem('id')) {
        this.$router.push('/fight/' + data.fight._id)
      }
    })
  }
}
</script>

<style scoped>
#player{
  background-color: #fafafa;
  overflow: auto;
}

#player > div{
  margin: 10px;
}

.Online{
  color:#1b5e20;
}

.Waiting{
  color:#ef6c00;
}

.Fight{
  color:#b71c1c;
}
</style>
