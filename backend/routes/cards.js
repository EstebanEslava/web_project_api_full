const router = require("express").Router();
const {
  getCards,
  cardCreate,
  cardDelete,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

router.get("/", getCards);

router.post("/", cardCreate);

router.delete("/:cardId", cardDelete);

router.put("/:cardId/likes", likeCard);

router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
