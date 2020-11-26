import ShapeEnum from "@/enums/ShapeEnum";

const randomNumberGenerator = (min = 1, max = 10) =>
  min + Math.round(Math.random() * max);

const getColorByShape = (shapeType) => {
  switch (shapeType) {
    case ShapeEnum.Square:
      return "red";
    case ShapeEnum.Triangle:
      return "darkblue";
    case ShapeEnum.Circle:
      return "green";
    default:
      return "lightgray";
  }
};

const getShapeProportions = (shapes = [], isLeftSize) => {
  return shapes.reduce((total, current) => {
    const left = isLeftSize ? 50 - current.left : current.left;

    total += current.weight * left;

    return total;
  }, 0);
};

function* idGenerator() {
  let id = 1;

  while (true) yield id++;
}

export default {
  randomNumberGenerator,
  getColorByShape,
  getShapeProportions,
  idGenerator: idGenerator(),
};
