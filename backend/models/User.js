const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 5,
      maxLength: 100,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.dribbble.com/users/1404327/screenshots/4109974/media/e23639d43ace34378581a9b468d16732.jpg?resize=800x600&vertical=center",
        publicId: null,
      },
    },

    bio: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isAccountVerify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// User Model
const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
