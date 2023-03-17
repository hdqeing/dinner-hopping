<script setup lang="ts">
</script>

<template>
  <div class="front">
    <h1>Participate in our Diner Hopping</h1>
    <h3>Savor homely cuisine and engage in conversations with novel acquaintances.</h3>
    <h3>Enroll now</h3>
    <router-link class="button" to="/for-oneself">For oneself</router-link>
    <div class="vertical-button-gap"></div>
    <router-link class="button" to="/with-a-friend">With a friend</router-link>
  </div>
</template>

<style scoped>
.h1 {
  font-size: 3em;
}
.h3 {
  font-size: 1.5em;
}
div.vertical-button-gap {
  height: 2vh
}
a.button {
  border: white 0.125em solid;
  width: 48vw
}
</style>