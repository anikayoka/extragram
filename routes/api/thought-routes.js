const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReactions,
  deleteReactions,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route("/")
  .get(getAllThoughts)
  .post(createThoughts);

// /api/thoughts/:id
router.route("/:id")
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

// /api/thoughts/:thoughtId/reaction
router.route("/:thoughtId/reactions")
.post(addReactions);

// /api/thoughts/:thoughtId/reactions/:reactionsId
router.route("/:thoughtId/:reactionId")
.delete(deleteReactions);

module.exports = router;