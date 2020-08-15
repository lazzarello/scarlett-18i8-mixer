<template>
  <div class="scarlett">
    <section v-if="errored">
      <p>The ALSA API is down, that's bad</p>
    </section>
    <section v-else>
      <div v-if="loading">Loading...</div>

      <div v-else>
        <h1>Scarlett 18i8 Mixer</h1>
        <p>Found Device: <tt>{{ info | findScarlett }}</tt></p>
        <ScarlettMixer />
      </div>
    </section> 
  </div>
</template>

<script>
  import axios from 'axios'
  var apiURL = 'http://localhost:1234/jsonapi?request=';
  import ScarlettMixer from './ScarlettMixer.vue'

  export default {
    data () {
      return {
        info: null,
        loading: true,
        errored: false,
      }
    },
    filters: {
      findScarlett ( cardArray ) {
        var outInfo = {}
        var found = false
        // this is kind ugly but whatevs
        let re = RegExp('.*18i8.*')
        cardArray.forEach(val => {
          if ( re.test(val.name) ) {
            found = true
            outInfo = val
          }
        })
        if ( found ) {
          return outInfo.name
        } else {
          outInfo = {"error": "No Scarlett device found"}
          return outInfo
        }
      }
    },
    mounted () {
      axios
        .get(apiURL + 'card-get-all')
        .then(response => (this.info = response.data.data))
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    },
    name: 'Scarlett',
    components: {
      ScarlettMixer
      //'ScarlettMixer': () => import('./ScarlettMixer.vue')
    }
  }
</script>
