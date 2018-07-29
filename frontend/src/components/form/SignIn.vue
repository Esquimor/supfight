<template>
  <div id="Sign in">
    <form @submit.prevent="checkFormSignin">
      <div class="elementForm">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          v-model="username">
      </div>
      <div class="elementForm">
        <label for="passwort">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          v-model="password">
      </div>
      <div class="elementForm">
        <label for="confirmation">Confirmation</label>
        <input
          type="password"
          name="confirmation"
          placeholder="confirmation"
          v-model="confirmation">
      </div>
      <input
        type="submit"
        value="Sign in">
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      confirmation: ''
    }
  },
  methods: {
    checkFormSignin () {
      this.axios.post('http://localhost:3000/api/signin', {
        username: this.username,
        password: this.password,
        confirmation: this.confirmation
      })
        .then(function (response) {
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('id', response.data.id)
          this.$router.push('/wait')
        }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
