import ShapeEnum from "@/enums/ShapeEnum";
import helpers from "@/helpers";

const addDroppedShape = (state, shape = {}) => {
  state.droppedShapeList.push(shape);
};

const clearAllShapes = (state) => {
  state.droppedShapeList = [];
  state.fallingShapeList = [];
  state.randomShapeList = [];
};

const toggleSimulation = (state) => {
  state.isGamePaused = !state.isGamePaused;
};

const generateShape = (
  { randomShapeList, fallingShapeList },
  randomlyPlaced = false
) => {
  const weight = helpers.randomNumberGenerator(
    ShapeEnum.MinWeight,
    ShapeEnum.MaxWeight - 1
  );
  const type = helpers.randomNumberGenerator(1, 2);
  const color = helpers.getColorByShape(type);

  const shape = {
    id: helpers.idGenerator.next().value,
    color,
    left: helpers.randomNumberGenerator(0, 40),
    scale: 1 + ShapeEnum.Scale * (weight - 1),
    top: 0,
    type,
    weight,
  };

  if (randomlyPlaced) {
    randomShapeList.push(shape);
  } else {
    fallingShapeList.push(shape);
  }
};

const moveShape = ({ fallingShapeList }, { moveLeft, width }) => {
  const shape = fallingShapeList[0];

  const canMoveLeft = shape.left - 1 >= 0;
  const canMoveRight = shape.left + width + 1 <= 45;

  if (moveLeft) canMoveLeft && shape.left--;
  else canMoveRight && shape.left++;
};

const toggleDialog = (state, isShown = false) => {
  state.isShowDialog = isShown;
};

const updateFallingInterval = (state, reset = false) => {
  if (reset) {
    state.fallingInterval = ShapeEnum.MaxFillingInterval;
  } else if (state.fallingInterval > ShapeEnum.MinFillingInterval) {
    state.fallingInterval--;
  }
};

export default {
  addDroppedShape,
  clearAllShapes,
  toggleSimulation,
  moveShape,
  toggleDialog,
  updateFallingInterval,
  generateShape,
};
