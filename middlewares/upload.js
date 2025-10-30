const multer = require("multer");
const path = require("path");
const generateCode = require("../utils/generateCode");

const storage = multer.diskStorage({
  destination: (req, res, callback) => {
    callback(null, "./uploads");
  },
  //originalfilename_12 random digits.extension
  filename: (req, file, callback) => {
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    const filename = originalName.replace(extension, "");
    const compressFilename = filename.split("").join("_");
    const lowercaseFilename = compressFilename.toLocaleLowerCase();
    const code = generateCode(12);
    const finalFile = `${lowercaseFilename}_${code}${extension}`;
    callback(null, finalFile);
  },
});

const fileFilter = (req, file, callback) => {
  const mimetype = file.mimetype;
  if (
    mimetype === "image/jpg" ||
    mimetype === "image/jpeg" ||
    mimetype === "image/png" ||
    mimetype === "application/pdf"
  ) {
    callback(null, true);
  } else {
    callback(new Error("Only allowed (jpg,jpeg,png,pdf)"));
  }
};

const uploadFile = multer({
  storage,
  fileFilter,
});

module.exports = uploadFile;
