import Vue from 'vue'
import './plugins/axios'
import App from './App.vue' 

Vue.config.productionTip = false;
//Vue.config.runtimeCompiler = true;

new Vue({
  render: h => h(App),
}).$mount('#app')
