const mongoose = require("mongoose");

const regex = /^(https?:\/\/)(www\.)?([\w\-._~:/?%#[\]@!$&'()*+,;=]+)#?$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
  },
  link: {
    type: String,
    required: true,
    maxlength: 30,
    minlength: 2,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: "No cuample con lo requerido",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
