<template>
  <div id="quickFight">
    <button
      id="quickFightBtn"
      @click="searchFight">Quick Fight</button>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data: function () {
    return {
      msg: '',
      socket: io('localhost:3000/wait', {
        query: {token: localStorage.getItem('token')}
      })
    }
  },
  methods: {
    searchFight () {
      this.socket.emit('QUICKFIGHT')
    }
  },
  mounted () {
    this.socket.on('QUICKFIGHT_ERROR', (data) => {
      if (data.id === localStorage.getItem('id')) {
        this.msg = data.msg
      }
    })
    this.socket.on('QUICKFIGHT_SUCCESS', (data) => {
      if (data.fight.player1 === localStorage.getItem('id') || data.fight.player2 === localStorage.getItem('id')) {
        this.$router.push('/fight/' + data.fight._id)
      }
    })
  }
}
</script>

<style scoped>
#quickFight{
  background-color: royalblue;
  display: flex;
  justify-content: center;
  align-items: center;
}

#quickFightBtn{
  padding: 50px;
  background-color: rebeccapurple;
  border: none;
  font-size: 2.5rem;
}
</style>
