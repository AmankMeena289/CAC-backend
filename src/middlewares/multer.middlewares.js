import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save incoming files to the public/temp directory
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    // Keep original filename (can be customized with unique suffixes/nanoid in production)
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
