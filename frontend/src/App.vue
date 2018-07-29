<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin:0px;
  padding:0px;
}

#player1{
  background-image: url('./assets/Base.png');
  background-repeat: no-repeat;
}

#player2{
  background-image: url('./assets/Base.png');
  background-repeat: no-repeat;
  transform: scaleX(-1);
}

@keyframes up {
  0% {bottom: 0px;}
  50% {bottom: 150px;}
  100% {bottom: 0px;}
}

@keyframes down {
  0% {height: 80px;}
  50% {height: 40px;}
  100% {height: 80px;}
}

.punch-start{
  background-image: url('./assets/PoingArme.png') !important;
}

@keyframes punch-start {
  0% {height: 80px;}
  50% {height: 100px;}
  100% {height: 80px;}
}

.punch{
  background-image: url('./assets/Poing.png') !important;
}
@keyframes punch {
  0% {height: 80px;}
  50% {height: 200px;}
  100% {height: 80px;}
}

.leg-start{
  background-image: url('./assets/JambeArme.png') !important;
}
@keyframes leg-start {
  0% {height: 80px;}
  50% {height: 100px;}
  100% {height: 80px;}
}

.leg{
  background-image: url('./assets/Jambe.png') !important;
}
@keyframes leg {
  0% {height: 80px;}
  50% {height: 100px;}
  100% {height: 80px;}
}

.super{
  background-image: url('./assets/Super.png') !important;
}
@keyframes super {
  0% {height: 80px;}
  50% {height: 100px;}
  100% {height: 80px;}
}

.super-start{
  background-image: url('./assets/SuperArme.png') !important;
}
@keyframes super-start {
  0% {height: 80px;}
  50% {height: 100px;}
  100% {height: 80px;}
}

.bas{
  background-image: url('./assets/Bas.png') !important;
}

.block-up{
  background-image: url('./assets/Garde.png') !important;
}
.block-down{
  background-image: url('./assets/GardeBas.png') !important;
}
@keyframes block {
  0% {height: 80px;}
  50% {height: 100px;}
  100% {height: 80px;}
}
</style>
