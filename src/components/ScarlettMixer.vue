<template>
  <div class="mixer">
    <button v-on:click="pan1()">Load Mixer Controls</button>
    <h1>I'm a ScarlettMixer!</h1>
    <div id="channel">
      <div id="pan"></div>
      <div id="volume"></div>
      <div id="outbus"></div>
    </div>
    <div id="debug">
      <hr />
      <h3>Debugging</h3>
      <tt>{{ controls.data }}</tt>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  var apiURL = 'http://localhost:1234/jsonapi?request=';
  // https://nexus-js.github.io/ui/api/#intro
  import Nexus from 'nexusui'
  //we gotta seperate the actual rendering of NexusUI elements before the context is started
  function loadAudio() {
    Nexus.context.resume();

    var pan = new Nexus.Pan('#pan');
    var volume = new Nexus.Slider("#volume", {
      'size': [20,200]
    });
    var outbus = new Nexus.Toggle('#outbus');

    var channel = [pan, volume, outbus];
    pan.on('change', function(v) {
      console.log('Pan ' + v.value);
    })

    volume.on('change', function(v) {
      console.log('Volume ' + v);
    })

    outbus.on('change', function(v) {
      console.log('Channel ' + v);
    })
    return channel;
  }

  export default {
    data () {
      return {
        controls: null,
        loading: true,
        errored: false,
        pan1: loadAudio,
        context: Nexus.context
      }
    },
    mounted () {
      // There can be more than one device named hw:USB
      // I'll have to pass in cardid from a value from the Scarlett component
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
