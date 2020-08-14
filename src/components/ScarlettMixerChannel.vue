<template>
  <div id="channel1" >
    <div id="input"></div>
    <div id="pan"></div>
    <div id="volume"></div>
    <div id="outbus"></div>
  </div>
</template>

<script>
  // element id's and names will come from the parent component
  // the loadAudio() function usefulness has expired
  // this will require moving all the UI logic into this component, with params
  export default {
    data () {
      return {
        errored: false,
      }
    },
    name: 'ScarlettMixerChannel'
  }
</script>
