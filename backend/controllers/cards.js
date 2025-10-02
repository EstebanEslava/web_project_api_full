const card = require("../models/cards");

function getCards(req, res) {
  card
    .find()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.error("Error en getCards:", err);
      res.status(500).send({ message: "Error al leer tarjetas" });
    });
}

function cardCreate(req, res) {
  const { name, link } = req.body;

  const owner = "68b275fb1355faf152ce4371";
  card
    .create({ name, link, owner })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Datos inválidos al crear la tarjeta" });
      }
      return res.status(500).send({ message: "Error en el servidor" });
    });
}

function cardDelete(req, res) {
  const { cardId } = req.params;

  card
    .findByIdAndDelete(cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.name = "NotFoundError";
      throw error;
    })

    .then((card) => {
      return res.status(200).send({ message: "Tarjeta eliminada", card });
    })
    .catch((err) => {
      console.error("Error en cardDelete:", err);

      if (err.name === "NotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }

      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de tarjeta no válido" });
      }
      res.status(500).send({ message: "Error en el servidor" });
    });
}

function likeCard(req, res) {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.name = "NotFoundError";
      throw error;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.error("Error en likeCard:", err);

      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de tarjeta no válido" });
      }
      if (err.name === "NotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      return res.status(500).send({ message: "Error en el servidor" });
    });
}

function dislikeCard(req, res) {
  card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.name = "NotFoundError";
      throw error;
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      console.error("Error en dislikeCard:", err);

      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de tarjeta no válido" });
      }
      if (err.name === "NotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      return res.status(500).send({ message: "Error en el servidor" });
    });
}

module.exports = { getCards, cardCreate, cardDelete, dislikeCard, likeCard };
