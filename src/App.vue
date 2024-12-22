<template>
  <div id="app">
    <h1>Create Nuxt Project</h1>
    <InputBar />
  </div>
</template>

<script>
import InputBar from './components/InputBar.vue';

export default {
  components: {
    InputBar,
  },
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}
</style>
