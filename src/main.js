import Vue from 'vue'
import './plugins/axios'
import App from './App.vue' 
// eslint-disable-next-line no-unused-vars
import Nexus from 'nexusui'

Vue.config.productionTip = false;
// Vue.config.runtimeCompiler = true;

// https://nexus-js.github.io/ui/api/#intro
// the following is a convention for defaults of Vue
// eslint-disable-next-line no-unused-vars
//var dial = new Nexus.Dial('#dial')

new Vue({
  render: h => h(App),
}).$mount('#app')
