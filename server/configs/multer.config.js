const multer = require("multer");

module.exports = {
  upload: multer({
    storage: multer.memoryStorage(),
  }),
};
