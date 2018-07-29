<!-- Page d'accueil -->
<template>
  <default-layout>
    <board :id="$route.params.id"/>
  </default-layout>
</template>

<script>
import defaultLayout from '@/layout/defaultLayout'
import Board from '@/components/fight/Board'

export default {
  components: {
    'default-layout': defaultLayout,
    'board': Board
  }
}
</script>

<style scoped>
#lost{
  width: 500px;
  height:200px;
  background-color: green;
}
</style>
