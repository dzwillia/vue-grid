import VueGrid from './components/Grid.vue'

// expose component to global scope
if (typeof window !== 'undefined' && window.Vue) {
  Vue.component('vue-grid', VueGrid)
}

export { VueGrid }

export default VueGrid
