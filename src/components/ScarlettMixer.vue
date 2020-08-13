<template>
  <div class="mixer">
    <button v-on:click="pan1(controls)">Load Mixer Controls</button>
    <h1>I'm a ScarlettMixer!</h1>
    <div id="channel">
      <div id="input"></div>
      <div id="pan"></div>
      <div id="volume"></div>
      <div id="outbus"></div>
    </div>
    <div id="debug">
      <hr />
      <h3>Debugging</h3>
      <tt>{{ controls.data[59] }}</tt>
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
    // our two output channels
    // this will expand to 8 to match the physical outs of the hardware
    // they should be static values but need to verify the IDs on another computer
    var data = [controls.data[41], controls.data[59]];

    var input = new Nexus.Select('#input', {
      'options': ['mic 1', 'mic 2']
    });

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
    // this will update the Analogue Output Playback enums
    // Capture => mixer in 1,2,3 = analog in 1, PCM1, PCM2
    var outbus = new Nexus.Toggle('#outbus', {
      'state': true
    });

    var channel = [input, pan, volume, outbus];

    pan.on('change', function(v) {
      // how to do a equal power pan
      // https://forum.juce.com/t/how-do-stereo-panning-knobs-work/25773/9
      var l = data[0].value * Math.min(1 - v.value, 1.0);
      var r = data[1].value * Math.min(1 + v.value, 1.0);
      //data[0].value = l;
      //data[1].value = r;
      axios
        .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[0].numid + '&value=' + l )
        .then(response => (console.log(response)));
      axios
        .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[1].numid + '&value=' + r)
        .then(response => (console.log(response)));        
      console.log('Left channel: ' + l + ' Right channel: ' + r);
    })

    volume.on('change', function(v) {
      var l = v * Math.min(1 - pan.value, 1.0);
      var r = v * Math.min(1 + pan.value, 1.0);
      data[0].value = l;
      data[1].value = r;
      axios
        .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[0].numid + '&value=' + l )
        .then(response => (console.log(response)));
      axios
        .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[1].numid + '&value=' + r)
        .then(response => (console.log(response)));
    })

    outbus.on('change', function(v) {
      // need some logic to stay muted when volume fader events move
      var l = volume.value * Math.min(1 - pan.value, 1.0);
      var r = volume.value * Math.min(1 + pan.value, 1.0);
      if ( v ) {
        axios
          .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[0].numid + '&value=' + l * 1)
          .then(response => (console.log(response)));
        axios
          .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[1].numid + '&value=' + r * 1)
          .then(response => (console.log(response)));        
      } else {
        axios
          .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[0].numid + '&value=' + 0 )
          .then(response => (console.log(response)));
        axios
          .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[1].numid + '&value=' + 0)
          .then(response => (console.log(response)));        
      } 
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
