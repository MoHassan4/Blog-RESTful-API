const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number, //1 --> SuperAdmin , 2-->normal Admin , 3-->normal User
      default: 3,
    },
    verificationCode: String,
    isVerified: {
      type: Boolean,
      default: false,
    },
    forgotPasswordCode: String,
    profilePic: { type: mongoose.Types.ObjectId, ref: "file" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
