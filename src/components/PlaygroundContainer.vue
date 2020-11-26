<template>
  <div class="w-full playground">
    <dialog-popup dialog-text="GAME OVER" />

    <info-panel />
    <falling-area />
    <teeter-totter />
    <control-panel />
  </div>
</template>

<script>
import InfoPanel from "@/components/InfoPanel";
import DialogPopup from "@/components/DialogPopup";
import TeeterTotter from "@/components/TeeterTotter";
import FallingArea from "@/components/FallingArea";
import { mapActions } from "vuex";
import ControlPanel from "@/components/ControlPanel";

export default {
  name: "PlaygroundContainer",
  components: {
    InfoPanel,
    DialogPopup,
    FallingArea,
    ControlPanel,
    TeeterTotter,
  },
  data() {
    return {
      isGameOver: false,
      totalWeighLeft: 0,
      calculatedMomentumLeft: 0,
      totalWeighRight: 0,
      calculatedMomentumRight: 0,
    };
  },
  mounted() {
    this.initGame();
  },
  methods: {
    ...mapActions(["initGame"]),
  },
};
</script>

<style scoped></style>
