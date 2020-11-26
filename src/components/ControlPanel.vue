<template>
  <div class="w-full border-top control-panel">
    <div class="m-auto lg:flex md:flex button-container">
      <vs-button
        class="mr-5 button"
        :icon="isGamePaused ? 'play_arrow' : 'pause'"
        @click="toggleSimulation"
        :disabled="isShowDialog"
        >{{ isGamePaused ? "Play" : "Pause" }}</vs-button
      >
      <vs-button type="border" class="button" icon="replay" @click="initGame"
        >Restart</vs-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "ControlPanel",
  computed: {
    ...mapState([
      "droppedShapeList",
      "fallingShapeList",
      "isGamePaused",
      "isShowDialog",
      "randomShapeList",
    ]),
  },
  methods: {
    ...mapActions(["initGame"]),
    ...mapMutations(["toggleSimulation"]),
  },
};
</script>

<style scoped>
.border-top {
  border-top: 1px solid grey;
}
.control-panel {
  position: absolute;
  width: 100%;
  height: fit-content;
  padding: 10px;
  bottom: 0;
}
.mr-5 {
  margin-right: 0.75rem;
}
.button {
  font-size: 16px;
  padding: 8px 25px 8px 17px;
}
.m-auto {
  margin: auto;
}
.button-container {
  width: fit-content;
}
</style>
