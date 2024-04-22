const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 255,
    },

    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 255,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 255,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minLength: 8,
      maxLength: 255,
    },

    bio: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    profilePhoto: {
      type: Object,
      default: {
        url: "https://img.icons8.com/fluency/48/user-male-circle--v1.png",
        publicId: null,
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
function validateRegisterUser(obj) {
  const schema = Joi.object({
    fullName: Joi.string().required().min(2).max(255),
    username: Joi.string().required().trim().min(2).max(255),
    email: Joi.string().required().trim().min(2).max(255).email(),
    password: Joi.string().required().trim().min(8).max(255),
    bio: Joi.string(),
  });

  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
};
