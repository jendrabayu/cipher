<template>
  <div id="app">
    <home-component />
  </div>
</template>

<script>
import HomeComponent from "./components/HomeComponent";
export default {
  name: "App",
  components: {
    HomeComponent,
  },
};
</script>