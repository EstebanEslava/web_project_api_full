const { default: mongoose } = require("mongoose");
const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function getUsers(req, res, next) {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
}

function getUserId(req, res, next) {
  User.findById(req.params.id)
    .orFail(() => {
      const error = new Error("ID no encontrado");
      throw error;
    })
    .then((user) => {
      if (!user) {
        const error = new Error("iD de usuario no encontrado");
        throw error;
        /*  return res.status(404).send({ message: "iD de usuario no encontrado" }); */
      }

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
}

function UserCreate(req, res, next) {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10).then((hash) =>
    User.create({ name, about, avatar, email, password: hash })
      .then((newUser) => {
        const userData = newUser.toObject();
        delete userData.password;

        res.status(201).send(userData);
      })
      .catch((err) => {
        next(err);
      })
  );
}

function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("Correo y contraseña requeridos");
    throw error;
  }

  User.findOne({ email })
    .select("+password")
    .then((User) => {
      if (!User) {
        const error = new Error("Correo y contraseña requeridos");
        throw error;
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          const error = new Error("Correo o contraseña incorrectos");
          throw error;
        }

        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET || "some-secret-key",
          { expiresIn: "7d" }
        );

        res.send({ token });
      });
    })
    .catch((err) => {
      next(err);
    });
}

function updateProfile(req, res, next) {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.name = "NotFoundError";
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      next(err);
    });
}

function updateAvatar(req, res, next) {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("No se pudo hacer el cambio");
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      next(err);
    });
}

function getCurrentUser(req, res, next) {
  const userId = req.user._id;

  User.findById(userId)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      throw error;
    })
    .then((currentUser) => {
      if (!currentUser) {
        const error = new Error("Usuario no encontrado");
        throw error;
      }
      res.send(currentUser);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getUsers,
  getUserId,
  UserCreate,
  login,
  updateProfile,
  updateAvatar,
  getCurrentUser,
};
