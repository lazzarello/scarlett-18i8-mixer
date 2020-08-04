import Vue from 'vue'
import App from './App.vue'
import axios from 'vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  mounted () {
    axios.get('http://localhost:1234/jsonapi?request=get-card-all').then(response => (this.info = response))}
}).$mount('#app')
