const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

//  création d'un objet de configuration //

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
    console.log("yes ");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");

    callback(null, name);
  },
});

module.exports = multer({ storage: storage }).single("image");
