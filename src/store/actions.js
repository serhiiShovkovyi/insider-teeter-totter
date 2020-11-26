const initGame = ({ commit, state }) => {
  if (!state.isGamePaused) commit("toggleSimulation");
  if (state.isShowDialog) commit("toggleDialog");

  commit("updateFallingInterval", true);
  commit("clearAllShapes");

  commit("generateShape");
  commit("generateShape");

  commit("generateShape", true);
};

export default { initGame };
