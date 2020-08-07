<template>
  <div class="mixer">
    <h1>I'm a ScarlettMixer!</h1>
    <tt>{{ controls.data }}</tt>
    <div id="dial"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  var apiURL = 'http://localhost:1234/jsonapi?request=';
  export default {
    data () {
      return {
        controls: null,
        loading: true,
        errored: false
      }
    },
    mounted () {
      // There can be more than one device named hw:USB
      // I'll have to pass in cardid from a value from the Scarlett component, so like nested component? vuex?
      axios
        .get(apiURL + 'ctrl-get-all' + '&cardid=hw:USB')
        .then(response => (this.controls = response.data))
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    },
    name: 'ScarlettMixer'
  }
</script>
