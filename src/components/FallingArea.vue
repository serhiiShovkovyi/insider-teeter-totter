<template>
  <div class="falling-area">
    <shape
      v-for="shape in fallingShapeList"
      :key="shape.id"
      :shape="shape"
      :id="`falling-shape-${shape.id}`"
    ></shape>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";
import Shape from "./Shape.vue";
import { BOARD_HEIGHT, BOARD_WIDTH } from "@/constants/boardConfig";
import {
  LEFT_ARROW_KEY,
  RIGHT_ARROW_KEY,
} from "@/constants/arrowCodeConstants";

export default {
  name: "FallingArea",
  components: {
    Shape,
  },
  data() {
    return {
      intervalId: null,
      bottomLimit: null,
    };
  },

  mounted() {
    const boardEl = document.querySelector(".board");

    boardEl.addEventListener("transitionend", this.handleBoardTransitionEnd);
    window.addEventListener("keydown", this.moveFallingShape);

    this.$once("hook:beforeDestroy", () => {
      boardEl.removeEventListener(
        "transitionend",
        this.handleBoardTransitionEnd
      );
      window.removeEventListener("keydown", this.moveFallingShape);
    });
  },
  computed: {
    ...mapGetters(["boardBendingAngle", "isBoardAngleWithinLimits"]),
    ...mapState(["fallingInterval", "fallingShapeList", "isGamePaused"]),

    fallingShapeEl() {
      const { id } = this.fallingShapeList[0];

      return document.getElementById(`falling-shape-${id}`);
    },
  },
  watch: {
    isGamePaused(current) {
      if (current) {
        clearInterval(this.intervalId);
      } else {
        this.getShapeBottomLimit();
        this.animateShape();
      }
    },
  },
  methods: {
    ...mapMutations([
      "addDroppedShape",
      "generateShape",
      "moveShape",
      "toggleSimulation",
      "toggleDialog",
      "updateFallingInterval",
    ]),

    animateShape() {
      this.intervalId = setInterval(() => {
        if (this.fallingShapeList[0].top >= this.shapeBottomLimit) {
          const droppedShape = this.fallingShapeList.shift();

          clearInterval(this.intervalId);

          this.addDroppedShape(droppedShape);
          this.updateFallingInterval();
          this.generateShape();
          this.animateShape();
        } else {
          this.fallingShapeList[0].top += 1;
          this.fallingShapeEl.style.top = `${this.fallingShapeList[0].top}px`;
        }
      }, this.fallingInterval);
    },

    getShapeBottomLimit() {
      const boardBounds = document
        .querySelector(".board")
        .getBoundingClientRect();
      const panelBounds = document
        .querySelector(".control-panel")
        .getBoundingClientRect();

      const shapeBounds = this.fallingShapeEl.getBoundingClientRect();

      const totterCathet = boardBounds.bottom - boardBounds.top - BOARD_HEIGHT;
      const similarCathet =
        (this.fallingShapeList[0].left * totterCathet) / BOARD_WIDTH;

      this.shapeBottomLimit =
        this.boardBendingAngle >= 0
          ? boardBounds.top +
            similarCathet -
            shapeBounds.height -
            panelBounds.height
          : boardBounds.bottom -
            similarCathet -
            shapeBounds.height -
            panelBounds.height;
    },

    handleBoardTransitionEnd() {
      if (this.isGamePaused) return;

      if (this.isBoardAngleWithinLimits) {
        this.getShapeBottomLimit();
      } else {
        this.toggleSimulation();
        this.toggleDialog(this.$store.state, true);
      }
    },

    moveFallingShape({ keyCode }) {
      const isArrowKeyPressed = [LEFT_ARROW_KEY, RIGHT_ARROW_KEY].includes(
        keyCode
      );

      if (this.isGamePaused || !isArrowKeyPressed) return;

      const shapeWidth = this.fallingShapeEl.getBoundingClientRect().width;
      const areaWidth = document
        .querySelector(".falling-area")
        .getBoundingClientRect().width;

      this.moveShape({
        moveLeft: keyCode === LEFT_ARROW_KEY,
        width: (shapeWidth / areaWidth) * 100,
      });

      this.$nextTick(this.getShapeBottomLimit);
    },
  },
};
</script>

<style scoped>
.falling-area {
  position: relative;
  flex: 1 1 50%;
  height: 390px;
}
</style>
