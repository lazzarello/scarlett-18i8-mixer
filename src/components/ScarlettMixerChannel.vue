<template>
  <div>
    <div id="input"></div>
    <div id="pan"></div>
    <div id="volume"></div>
    <div id="outbus"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        errored: false,
      }
    },
    name: 'ScarlettMixerChannel'
  }
</script>
