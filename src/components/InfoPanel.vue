<template>
  <div class="w-full vs-card-styles flex m-auto f-w-300">
    <div class="w-1-2">
      <h3>Total weigh: {{ leftSideSum }}</h3>
      <h3>Momentum: {{ fallingShapeList[0] && fallingShapeList[0].weight }}</h3>
    </div>
    <div class="w-1-2">
      <h3>Total weigh: {{ rightSideSum }}</h3>
      <h3>Momentum: {{ rightMomentum }}</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "InfoPanel",
  data() {
    return {
      leftSideSum: 0,
      rightSideSum: 0,
      rightMomentum: 0,
    };
  },
  computed: {
    ...mapState(["randomShapeList", "droppedShapeList", "fallingShapeList"]),
  },
  watch: {
    randomShapeList(newVal) {
      this.rightMomentum = newVal.slice(-1)[0].weight;
      if (newVal.length === 1) {
        this.rightSideSum = newVal[0].weight;
      } else {
        newVal.forEach((item) => {
          this.rightSideSum += item.weight;
        });
      }
    },
    droppedShapeList(newVal) {
      if (!newVal[0]) {
        this.leftSideSum = 0;
      }
      newVal.forEach((item) => {
        this.leftSideSum += item.weight;
      });
    },
  },
};
</script>

<style scoped>
h3 {
  color: grey;
}
</style>
