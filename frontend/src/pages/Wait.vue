<!-- Page d'accueil -->
<template>
  <default-layout>
    <div id="main">
      <quick-fight/>
      <chat/>
      <player/>
    </div>
  </default-layout>
</template>

<script>
import defaultLayout from '@/layout/defaultLayout'
import Chat from '@/components/wait/Chat'
import Player from '@/components/wait/Player'
import QuickFight from '@/components/wait/QuickFight'

export default {
  components: {
    'default-layout': defaultLayout,
    'chat': Chat,
    'player': Player,
    'quick-fight': QuickFight
  }
}
</script>

<style scoped>
#main{
  display: flex;
  flex-wrap: wrap;
}

#main > div{
  width:33%;
  min-height: 500px;
  max-height: 500px;
}
</style>
