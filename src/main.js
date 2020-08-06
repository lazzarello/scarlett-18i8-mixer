import Vue from 'vue'
import './plugins/axios'
import axios from 'axios'
import App from './App.vue' // no data because we're not importing it?
// commenting this out removes the default template, which is a bit weird.

Vue.config.productionTip = false;
Vue.config.runtimeCompiler = true;
var apiURL = 'http://localhost:1234/jsonapi?request=card-get-all';

new Vue({
  render: h => h(App),
//  el: '#app',
//  data () {
//    return {
//      info: null
//    }
//  },
//  mounted () {
//    axios.get(apiURL).then(response => (this.info = response))
//  }
}).$mount('#app')
