<template>
  <div class="mixer">
    <button v-on:click="pan1(controls)">Load Mixer Controls</button>
    <h1>I'm a ScarlettMixer!</h1>
    <div id="channel">
      <div id="pan"></div>
      <div id="volume"></div>
      <div id="outbus"></div>
    </div>
    <div id="debug">
      <hr />
      <h3>Debugging</h3>
      <tt>{{ controls.data[43] }}</tt>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  var apiURL = 'http://localhost:1234/jsonapi?request=';
  // https://nexus-js.github.io/ui/api/#intro
  import Nexus from 'nexusui'
  //we gotta seperate the actual rendering of NexusUI elements before the context is started
  function loadAudio(controls) {
    Nexus.context.resume();
    var data = [controls.data[43], controls.data[62]];

    var pan = new Nexus.Pan('#pan', {
      'value': 0
    });
    var volume = new Nexus.Slider("#volume", {
      'size': [20,200],
      'min': data[0].ctrl.min,
      'max': data[0].ctrl.max,
      'step': data[0].ctrl.step,
      'value': data[0].value[0]
    });
    var outbus = new Nexus.Toggle('#outbus');

    var channel = [pan, volume, outbus];
    pan.on('change', function(v) {
      /*
      if ( pan.value === 0 ) {
        data[0].value = v;
        data[1].value = v;
      } else if ( pan.value < 0 ) {
        data[0].value = v;
        data[1].value = v - (v * pan.value);
      } else if ( pan.value > 0 ) {
        data[0].value = v - (v * pan.value);
        data[1].value = v;
      }
      */
      console.log(v.value);
    })

    volume.on('change', function(v) {
      if ( pan.value === 0 ) {
        data[0].value = v;
        data[1].value = v;
      } else if ( pan.value < 0 ) {
        data[0].value = v;
        data[1].value = v - Math.abs(v * pan.value);
      } else if ( pan.value > 0 ) {
        data[0].value = v - Math.abs(v * pan.value);
        data[1].value = v;
      }
      console.log({'L': data[0].value,'R': data[1].value,'value': v});
      axios
        .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[0].numid + '&value=' + data[0].value)
        .then(response => (console.log(response)));
      axios
        .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[1].numid + '&value=' + data[1].value)
        .then(response => (response));
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
    filters: {
      controlNames(controls) {
        var names = []
        controls.forEach(val => {
          names.push(val.name)
        });
        return names;
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
