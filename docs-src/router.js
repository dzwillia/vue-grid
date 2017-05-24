import Vue from 'vue'
import VueRouter from 'vue-router'
import GridInteractions from './GridInteractions.vue'

// use VueRouter for handling browser history
Vue.use(VueRouter)

const routes = [
  { path: '*', redirect: '/interactions' }, // catch all route to redirect 404s
  { path: '/', redirect: '/interactions' },
  { path: '/interactions', component: GridInteractions }
]

export default new VueRouter({
  //mode: 'history', // use HTML5 history
  base: '/vue-grid/', // serve app from /vue-grid base folder
  routes
})
