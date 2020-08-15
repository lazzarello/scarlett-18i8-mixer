<template>
  <div class="mixer">
    <h1>I'm a ScarlettMixer!</h1>
    <ScarlettMixerChannels />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        errored: false,
      }
    },
    name: 'ScarlettMixer',
    components: {
      'ScarlettMixerChannels': () => import('./ScarlettMixerChannels.vue')
    }
  }
</script>
