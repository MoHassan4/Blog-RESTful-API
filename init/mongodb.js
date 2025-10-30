const mongoose = require("mongoose");
const { connection_url } = require("../config/keys");

const mongodbConnect = async () => {
  try {
    await mongoose.connect(connection_url);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = mongodbConnect;
