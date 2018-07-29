<template>
  <div id="login">
    <form @submit.prevent="checkFormLogin">
      <div class="elementForm">
        <label for="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          v-model="username">
      </div>
      <div class="elementForm">
        <label for="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          v-model="password">
      </div>
      <input
        type="submit"
        value="Login">
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    checkFormLogin () {
      this.axios.post('http://localhost:3000/api/login',
        {
          username: this.username,
          password: this.password
        })
        .then(function (response) {
          console.log(response)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('name', response.data.name)
          localStorage.setItem('id', response.data.user._id)
          this.$router.push('/wait')
        }.bind(this))
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
