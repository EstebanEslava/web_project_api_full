const mongoose = require("mongoose");

const regex = /^(https?:\/\/)(www\.)?([\w\-._~:/?%#[\]@!$&'()*+,;=]+)#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  about: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: "No cumple con los caracteres requeridos",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
