<template>
  <div id="app">
    <Scarlett />
    <ScarlettMixer />
  </div>
</template>

<script>
  import Scarlett from './components/Scarlett.vue'
  import ScarlettMixer from './components/ScarlettMixer.vue'

  export default {
    name: 'App',
    components: {
      Scarlett,
      ScarlettMixer
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
