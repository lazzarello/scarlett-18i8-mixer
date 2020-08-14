<template>
  <div id="channels">
    <ScarlettMixerChannel />
  </div>
</template>

<script>
  import ScarlettMixerChannel from './components/ScarlettMixerChannel.vue'

  export default {
    data () {
      return {
        errored: false,
      }
    },
    name: 'ScarlettMixerChannels',
    components: {
      ScarlettMixerChannel
    }
  }
</script>
