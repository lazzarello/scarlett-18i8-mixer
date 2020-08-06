<template>
  <div class="scarlett">
    <h1>Scarlett 18i8 Mixer</h1>
      <p>Found Device: <tt>{{ info | findScarlett }}</tt></p>
  </div>
</template>

<script>
  import axios from 'axios'
  var apiURL = 'http://localhost:1234/jsonapi?request=';
  export default {
    data () {
      return {
        info: null
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
          return outInfo.info
        } else {
          outInfo = {"error": "No Scarlett device found"}
          return outInfo
        }
      }
    },
    mounted () {
      axios.get(apiURL + 'card-get-all').then(response => (this.info = response.data.data));
      // need to do error handling
    },
    name: 'Scarlett'
  }
</script>
