<template>
  <div id="app">
    <PlaygroundContainer />
  </div>
</template>

<script>
import PlaygroundContainer from "@/components/PlaygroundContainer";

export default {
  name: "App",
  components: {
    PlaygroundContainer,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Open S, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #f8f8f8;
}
.vs-card-styles {
  background: white;
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 4px;
  margin: 0.5rem 0 0.5rem 0;
}
.w-1-2 {
  width: 50% !important;
}
.flex {
  display: flex !important;
}
.f-w-300 {
  font-weight: 300 !important;
  h3 {
    font-weight: 300;
  }
}
.h-full {
  height: 100%;
}
</style>
