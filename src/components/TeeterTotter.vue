<template>
  <div class="teeter-totter">
    <div class="board" :style="boardStyles">
      <!-- Dropped shapes (left side) -->
      <shape
        v-for="shape in droppedShapeList"
        :key="shape.id"
        :shape="shape"
        on-board
      ></shape>

      <!-- Randomly places shapes (right side) -->
      <shape
        v-for="shape in randomShapeList"
        :key="shape.id"
        :shape="shape"
        on-board
        randomly-placed
      ></shape>
    </div>

    <div class="teeter-totter__foundation"></div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import { BOARD_HEIGHT } from "@/constants/boardConfig";

import Shape from "./Shape.vue";

export default {
  name: "TeeterTotter",
  components: { Shape },
  computed: {
    ...mapGetters(["boardBendingAngle", "isBoardAngleWithinLimits"]),
    ...mapState(["droppedShapeList", "randomShapeList"]),

    boardStyles() {
      return {
        transform: `rotate(${this.boardBendingAngle / 2}deg)`,
        height: `${BOARD_HEIGHT}px`,
      };
    },

    shapesDiff() {
      return this.droppedShapeList.length - this.randomShapeList.length;
    },
  },
  watch: {
    shapesDiff(current) {
      if (current && this.isBoardAngleWithinLimits) {
        this.generateShape(true);
      }
    },
  },
  methods: {
    ...mapMutations(["generateShape"]),
  },
};
</script>

<style scoped>
.teeter-totter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.board {
  position: relative;
  width: 100%;
  background-color: #d74545;
  transition: 300ms ease-in-out;
}

.teeter-totter__foundation {
  width: 0;
  height: 0;
  border-left: 3rem solid transparent;
  border-right: 3rem solid transparent;
  border-bottom: 8rem solid #9b9b9b;
}
</style>
