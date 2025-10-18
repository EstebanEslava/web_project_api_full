const router = require("express").Router();
const {
  getCards,
  cardCreate,
  cardDelete,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const { validateCard, validateCardId } = require("../middlewares/validation");

router.get("/", getCards);

router.post("/", validateCard, cardCreate);

router.delete("/:cardId", validateCardId, cardDelete);

router.put("/:cardId/likes", validateCardId, likeCard);

router.delete("/:cardId/likes", validateCardId, dislikeCard);

module.exports = router;
