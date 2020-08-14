<template>
  <div id="channels">
    <div v-for="(item, index) in items" :key="index" >
      <p>index: {{ index }}</p>
      <p>channel {{ item }}</p>
      <ScarlettMixerChannel :index="index" />
    </div>
  </div>
</template>

<script>
  // https://vuejs.org/v2/guide/index.html#Composing-with-Components
  // https://vuejs.org/v2/guide/list.html
  // use properties and v-bind to pass data to a channel
  import ScarlettMixerChannel from './ScarlettMixerChannel.vue'

  export default {
    data () {
      return {
        errored: false,
        items: ["one", "two"]
      }
    },
    name: 'ScarlettMixerChannels',
    components: {
      ScarlettMixerChannel
    }
  }
</script>
