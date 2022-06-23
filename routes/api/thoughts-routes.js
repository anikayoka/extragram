const router = require("express").Router();
const {
  addThoughts,
  removeThoughts,
  addReactions,
  removeReactions,
} = require("../../controllers/s-controller");

// /api/thoughtss/<pizzaId>
router.route("/:pizzaId").post(addThoughts);

// /api/thoughtss/<pizzaId>/<thoughtsId>
router.route("/:pizzaId/:thoughtsId").put(addReactions).delete(removeThoughts);

router.route("/:pizzaId/:thoughtsId/:ReactionsId").delete(removeReactions);

module.exports = router;