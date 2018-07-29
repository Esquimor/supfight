<template>
  <header>
    <nav>
      <ul>
        <router-link
          to="/"
          tag="li">Accueil</router-link>
        <router-link
          to="/wait"
          v-if="connect"
          tag="li">Wait</router-link>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  data: function () {
    return {
      connect: false
    }
  },
  mounted () {
    if (localStorage.getItem('id')) {
      this.connect = true
    }
  }
}
</script>

<style scoped>
nav{
    height: 100%;
}

ul{
    display: flex;
    align-items: center;
    justify-content: center;
    width:100%;
    height: 100%;
}

li{
    list-style: none;
    padding:5px;
    margin-left: 25px;
    text-align: center;
    font-size: 1.2em;
    background-color: #1e88e5;
    color:white;
    cursor: pointer;
}

li.router-link-active{
    background-color: #0d47a1;
}

li:hover{
    background-color: #7b1fa2;
}
</style>
