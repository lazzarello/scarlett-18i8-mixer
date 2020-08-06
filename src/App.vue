<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Scarlett cardinfo="cardinfo should be a variable" />
    <h1>The soundcards</h1>
      <p>Device Name: {{ info.cardid }}</p>
      <p>Device Info: {{ info.info }}</p>
  </div>
</template>


<script>
  import HelloWorld from './components/HelloWorld.vue'
  import Scarlett from './components/Scarlett.vue'
  import axios from 'axios'
  var apiURL = 'http://localhost:1234/jsonapi?request=';

  export default {
    data () {
      return {
        info: null
      }
    },
    mounted () {
      axios.get(apiURL + 'card-get-all').then(response => (this.info = response.data.data[3]));
    },
    name: 'App',
    components: {
      HelloWorld,
      Scarlett
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
