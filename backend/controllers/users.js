const { default: mongoose } = require("mongoose");
const user = require("../models/users");

function getUsers(req, res) {
  user
    .find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Error al leer usuarios" }));
}

function getUserId(req, res) {
  user
    .findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "iD de usuario no encontrado" });
      }

      res.send(user);
    })
    .catch(() => res.status(500).send({ message: "Error al leer usuarios" }));
}

function UserCreate(req, res) {
  const { name, about, avatar } = req.body;
  user
    .create({ name, about, avatar })
    .then((newUser) => res.status(201).send(newUser))
    .catch((err) =>
      res
        .status(400)
        .send({ message: "Error al crear usuario", error: err.message })
    );
}

function updateProfile(req, res) {
  const { name, about } = req.body;

  user
    .findByIdAndUpdate(
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
      console.error("Error en updateProfile:", err);

      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Datos inválidos para actualizar perfil" });
      }
      if (err.name === "NotFoundError") {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      return res.status(500).send({ message: "Error en el servidor" });
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;

  user
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true }
    )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.name = "NotFoundError";
      throw error;
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error("Error en updateAvatar:", err);

      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Datos inválidos para actualizar avatar" });
      }
      if (err.name === "NotFoundError") {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      return res.status(500).send({ message: "Error en el servidor" });
    });
}

module.exports = {
  getUsers,
  getUserId,
  UserCreate,
  updateProfile,
  updateAvatar,
};
