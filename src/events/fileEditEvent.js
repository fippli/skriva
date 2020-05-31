const { dispatch } = require("../state");

// When the file is edited
const fileEditEvent = (_, fileContent) => {
  try {
    dispatch({ fileContent });
  } catch (error) {
    console.error(error);
  }
};

module.exports = fileEditEvent;
