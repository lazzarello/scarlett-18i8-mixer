import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  mounted () {
    axios.get('http://localhost:1234/jsonapi?request=card-get-all').then(response => (this.info = response))}
}).$mount('#app')
