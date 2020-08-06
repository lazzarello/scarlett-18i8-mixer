import Vue from 'vue'
import './plugins/axios'
import App from './App.vue' // no data because we're not importing it?
// commenting this out removes the default template, which is a bit weird.

Vue.config.productionTip = false;
//Vue.config.runtimeCompiler = true;

new Vue({
  render: h => h(App),
}).$mount('#app')
