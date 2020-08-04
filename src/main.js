import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'

Vue.config.productionTip = false
var apiURL = 'http://localhost:1234/jsonapi?request=card-get-all';

new Vue({
  render: h => h(App),
  mounted () {
    axios.get(apiURL).then(response => (this.info = response))}
}).$mount('#app')
