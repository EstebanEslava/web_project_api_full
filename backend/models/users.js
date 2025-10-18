const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const regex = /^(https?:\/\/)(www\.)?([\w\-._~:/?%#[\]@!$&'()*+,;=]+)#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Jacques Cousteau",
    maxlength: 30,
    minlength: 2,
  },
  about: {
    type: String,
    default: "Explorador",
    maxlength: 30,
    minlength: 2,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: "No cumple con los caracteres requeridos",
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: isEmail,
      message: "debe ser un correo electónico valido",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

module.exports = mongoose.model("user", userSchema);
