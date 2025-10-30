const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { fileController } = require("../controllers");
const uploadFile = require("../middlewares/upload");

router.post(
  "/upload",
  isAuth,
  uploadFile.single("image"),
  fileController.uploadFile
);

module.exports = router;
