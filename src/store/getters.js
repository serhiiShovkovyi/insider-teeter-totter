import { MAX_BENDING_ANGLE, MIN_BENDING_ANGLE } from "@/constants/boardConfig";
import helper from "@/helpers";

const boardBendingAngle = (
  state,
  { droppedShapesSum, randomlyPlacedShapesSum }
) => {
  let angle = 0;

  if (!droppedShapesSum) {
    angle = MAX_BENDING_ANGLE;
  } else {
    const subtraction = Math.abs(droppedShapesSum - randomlyPlacedShapesSum);

    angle =
      droppedShapesSum > randomlyPlacedShapesSum
        ? (subtraction / droppedShapesSum) * -50
        : (subtraction / randomlyPlacedShapesSum) * 50;
  }

  return angle;
};

const droppedShapesSum = ({ droppedShapeList }) => {
  return helper.getShapeProportions(droppedShapeList, true);
};

const isBoardAngleWithinLimits = (
  state,
  { boardBendingAngle, droppedShapesSum, randomlyPlacedShapesSum }
) => {
  const subtraction = Math.abs(droppedShapesSum - randomlyPlacedShapesSum);

  return (
    boardBendingAngle > MIN_BENDING_ANGLE &&
    boardBendingAngle < MAX_BENDING_ANGLE &&
    subtraction < 100
  );
};

const randomlyPlacedShapesSum = ({ randomShapeList }) => {
  return helper.getShapeProportions(randomShapeList);
};

export default {
  boardBendingAngle,
  droppedShapesSum,
  isBoardAngleWithinLimits,
  randomlyPlacedShapesSum,
};
