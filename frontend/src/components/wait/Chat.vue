<template>
  <div id="chat">
    <div
      class="messages"
      v-for="(msg, index) in messages"
      :key="index">
      <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
    </div>
    <hr>
    <form @submit.prevent="sendMessage">
      <div class="gorm-group pb-3">
        <label for="message">Message:</label>
        <input
          type="text"
          v-model="message"
          class="form-control">
      </div>
      <button
        type="submit"
        class="btn btn-success">Send</button>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      message: '',
      messages: [],
      socket: io('localhost:3000/chat', {
        query: {token: localStorage.getItem('token')}
      })
    }
  },
  methods: {
    sendMessage (e) {
      e.preventDefault()
      this.socket.emit('SEND_MESSAGE', {
        message: this.message
      })
      this.message = ''
    }
  },
  mounted () {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data]
      // you can also do this.messages.push(data)
    })
  }
}
</script>

<style scoped>
#chat{
  overflow: auto;
}
</style>
