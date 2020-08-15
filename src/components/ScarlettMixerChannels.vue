<template>
  <div id="channels">
    <div v-for="(item, index) in items" :key="index" >
      <p>index: {{ index }}</p>
      <p>channel {{ item }}</p>
      <ScarlettMixerChannel :id="index" />
    </div>
    <hr />
    <div id="debug">
      {{ this.controls.data[221] }}
    </div> 
  </div>
</template>

<script>
  import axios from 'axios'
  var apiURL = 'http://localhost:1234/jsonapi?request=';
  // https://vuejs.org/v2/guide/index.html#Composing-with-Components
  // https://vuejs.org/v2/guide/list.html
  import ScarlettMixerChannel from './ScarlettMixerChannel.vue'
  import Nexus from 'nexusui'

  function loadControls(controls) {
    var data = [controls.data[41], controls.data[59]];
    var inputSource = controls.data[221];

    var input = new Nexus.Select('#input', {
      'options': inputSource.ctrl.enums
    });
    // set the selected input to the data from the API.
    // weird that this isn't an option in the constructor
    input.selectedIndex =  inputSource.value[0];

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

    input.on('change', function(v) {
      inputSource.value = v.index;
      axios
        .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + inputSource.numid + '&value=' + v.index )
        .then(response => (response));
      //console.log(v);
    });

    pan.on('change', function(v) {
      // how to do an equal power pan
      // https://forum.juce.com/t/how-do-stereo-panning-knobs-work/25773/9
      // MATHS!
      // http://www.cs.cmu.edu/~music/icm-online/readings/panlaws/index.html
      var l = data[0].value * Math.min(1 - v.value, 1.0) * outbus.state;
      var r = data[1].value * Math.min(1 + v.value, 1.0) * outbus.state;
      // this is probably not needed because I think the API is breaking, not this code
      // but panning does stop working after a few hundred events
      axios
        .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[0].numid + '&value=' + l )
        .then(response => (response));
      axios
        .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[1].numid + '&value=' + r)
        .then(response => (response));        
      //console.log('Left channel: ' + l + ' Right channel: ' + r);
    })

    volume.on('change', function(v) {
      if ( outbus.state ) {
        var l = v * Math.min(1 - pan.value, 1.0) * outbus.state;
        var r = v * Math.min(1 + pan.value, 1.0) * outbus.state;
        data[0].value = l;
        data[1].value = r;
        axios
          .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[0].numid + '&value=' + l )
          .then(response => (response));
        axios
          .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[1].numid + '&value=' + r)
          .then(response => (response));
      }
    })

    outbus.on('change', function(v) {
      var l = volume.value * Math.min(1 - pan.value, 1.0) * v;
      var r = volume.value * Math.min(1 + pan.value, 1.0) * v;
      if ( v ) {
        axios
          .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[0].numid + '&value=' + l)
          .then(response => (response));
        axios
          .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[1].numid + '&value=' + r)
          .then(response => (response));        
      } else {
        axios
          .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[0].numid + '&value=' + l )
          .then(response => (response));
        axios
          .get(apiURL + 'ctrl-set-one' + '&cardid=hw:USB&numid=' + data[1].numid + '&value=' + r)
          .then(response => (response));        
      } 
      //console.log('Channel ' + v);
    })
  }

  export default {
    data () {
      return {
        errored: false,
        controls: null,
        items: null
      }
    },
    mounted () {
      // There can be more than one device named hw:USB
      // I'll have to pass in cardid from a value from the Scarlett component
      axios
        .get(apiURL + 'ctrl-get-all' + '&cardid=hw:USB')
        .then(response => {
          this.controls = response.data;
          this.items = this.controls.data[221].ctrl.enums;
          //this.items = ["one", "two"];
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => loadControls(this.controls))
    },
    name: 'ScarlettMixerChannels',
    components: {
      ScarlettMixerChannel
    }
  }
</script>
