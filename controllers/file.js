const File = require("../models/File");

const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const newFile = await File.create({
      key: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      createdBy: req.user ? req.user._id : null,
    });

    res.status(201).json({
      message: "File uploaded successfully",
      file: newFile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { uploadFile };
