const reducer = (update) => (state) => ({
  ...state,
  ...update,
});

module.exports = reducer;
