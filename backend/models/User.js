const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

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

//login token
UserSchema.methods.generateLoginToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.PRIVATE_KEY
    // {
    //   expiresIn: "100d",
    // }
  );
};

// User Model
const User = mongoose.model("User", UserSchema);

// Register Validation
function validateRegisterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().trim().required().min(2).max(100),
    email: Joi.string().trim().required().min(5),
    password: Joi.string().trim().required().min(8),
  });

  return schema.validate(obj);
}

// Login Validation
function validateLogin(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().required().min(5),
    password: Joi.string().trim().required().min(8),
  });

  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegisterUser,
  validateLogin,
};
