<template>
  <div class="scarlett">
    <tt> {{ cardinfo }} </tt>
  </div>
</template>

<script>
  export default {
    name: 'Scarlett',
    props: {
      cardinfo: String
    }
  }
</script>
