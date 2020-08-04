import Vue from 'vue'
import './plugins/axios'
import axios from 'axios'
//import App from './App.vue'

Vue.config.productionTip = false;
Vue.config.runtimeCompiler = true;
var apiURL = 'http://localhost:1234/jsonapi?request=card-get-all';

new Vue({
  el: '#app',
  data () {
    return {
      info: null
    }
  },
  mounted () {
    axios.get(apiURL).then(response => (this.info = response))
  }
})
