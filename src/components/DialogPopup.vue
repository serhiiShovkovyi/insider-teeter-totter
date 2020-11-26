<template>
  <vs-popup :active.sync="isOpenPopup" :title="dialogHeader">
    <div class="w-full p-5">
      <h1 class="dialog-t">{{ dialogText }}</h1>
    </div>
    <vs-button class="m-auto" @click="restartGame">TryAgain</vs-button>
  </vs-popup>
</template>

<script>
import { mapMutations } from "vuex";
import actions from "@/store/actions";
export default {
  name: "DialogPopup",
  props: {
    dialogText: {
      type: String,
      required: true,
      default: "",
    },
    dialogHeader: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isOpenPopup: false,
    };
  },
  computed: {
    ...mapMutations(["toggleSimulation"]),
  },
  watch: {
    "$store.state.isShowDialog"(newVal) {
      this.isOpenPopup = !!newVal;
    },
  },
  methods: {
    restartGame() {
      this.isShowDialog = false;
      actions.initGame(this.$store);
    },
  },
};
</script>

<style>
.dialog-t {
  font-weight: 300;
  font-family: Open S, sans-serif;
  width: fit-content;
  margin: auto;
  margin-bottom: 10px;
}
.m-auto {
  margin: auto;
}
</style>
