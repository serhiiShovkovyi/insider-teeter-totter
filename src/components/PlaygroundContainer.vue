<template>
  <div class="w-full playground">
    <dialog-popup @on-retry="initGame" dialog-text="GAME OVER" />

    <info-panel
      :calculated-momentum-left="totalWeighLeft"
      :calculated-momentum-right="calculatedMomentumLeft"
      :total-weigh-left="totalWeighRight"
      :total-weigh-right="calculatedMomentumRight"
    />
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
