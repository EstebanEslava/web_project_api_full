const card = require("../models/cards");

function getCards(req, res, next) {
  card
    .find()
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      next(err);
    });
}

function cardCreate(req, res, next) {
  const { name, link } = req.body;

  const owner = req.user._id;
  card
    .create({ name, link, owner })
    .then((newCard) => res.status(201).send(newCard))
    .catch((err) => {
      /* if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Datos inválidos al crear la tarjeta" }); //PREGUNTAR COMO SE MANEJARIA ESTE ERROR
      }
      return res.status(500).send({ message: "Error en el servidor" }); */
      next(err);
    });
}

function cardDelete(req, res, next) {
  const { cardId } = req.params;
  const userId = req.user._id;

  card
    .findById(cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.name = "NotFoundError";
      throw error;
    })
    .then((foundCard) => {
      if (foundCard.owner.toString() !== userId) {
        const error = new Error("No puedes borrar tarjetas de otros usuarios");
        error.name = "NotFoundError";
        throw error;
      }
      return card.findByIdAndDelete(cardId).then(() => {
        res.status(200).send({ message: "Tarjeta eliminada correctamente" });
      });
    })

    .catch((err) => {
      /* console.error("Error en cardDelete:", err);

      if (err.name === "NotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }

      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de tarjeta no válido" });
      }
      res.status(500).send({ message: "Error en el servidor" }); */
      next(err);
    });
}

function likeCard(req, res, next) {
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
      /* console.error("Error en likeCard:", err);

      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de tarjeta no válido" });
      }
      if (err.name === "NotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      return res.status(500).send({ message: "Error en el servidor" });*/

      next(err);
    });
}

function dislikeCard(req, res, next) {
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
      /* console.error("Error en dislikeCard:", err);

      if (err.name === "CastError") {
        return res.status(400).send({ message: "ID de tarjeta no válido" });
      }
      if (err.name === "NotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      return res.status(500).send({ message: "Error en el servidor" }); */

      next(err);
    });
}

module.exports = { getCards, cardCreate, cardDelete, dislikeCard, likeCard };
