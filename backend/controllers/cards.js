const card = require("../models/cards");

function getCards(req, res, next) {
  card
    .find()
    .sort({ createdAt: -1 })
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
      next(err);
    });
}

module.exports = { getCards, cardCreate, cardDelete, dislikeCard, likeCard };
