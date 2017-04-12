import Vue from 'vue'
import App from './components/App.vue'
//import './stylesheets/style.less' // common styles

// initial view necessary to begin using Vue

const app = new Vue({
  el: '#app',
  render: h => h(App)
})
