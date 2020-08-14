<template>
  <div id="channels">
    <ScarlettMixerChannel />
  </div>
</template>

<script>
  // https://vuejs.org/v2/guide/index.html#Composing-with-Components
  // use properties and v-bind to pass data to a channel
  import ScarlettMixerChannel from './ScarlettMixerChannel.vue'

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
