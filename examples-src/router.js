import Vue from 'vue'
import VueRouter from 'vue-router'
import GridInteractions from './GridInteractions.vue'

// use VueRouter for handling browser history
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/interactions' },
  { path: '/interactions', component: GridInteractions }
]

export default new VueRouter({
  mode: 'history', // use HTML5 history
  base: '/examples/', // serve app from /app base folder
  routes
})
