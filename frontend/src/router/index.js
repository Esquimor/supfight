import Vue from 'vue'
import Router from 'vue-router'
import Accueil from '@/pages/Accueil'
import Fight from '@/pages/Fight'
import Wait from '@/pages/Wait'

Vue.use(Router)

// Route 1er niveau
const route = [
  {
    path: '/',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/fight/:id',
    name: 'Fight',
    component: Fight
  },
  {
    path: '/wait',
    name: 'Wait',
    component: Wait
  }
]

export default new Router({
  mode: 'history',
  routes: route
})
