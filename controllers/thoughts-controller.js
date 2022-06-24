const { Thoughts } = require("../models");

const ThoughtsController = {
  // the functions will go in here as methods
  // get all Thoughtss
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .populate('Reactions')
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

// get one Thoughts by id
getThoughtsById({ params }, res) {
  Thoughts.findOne({ _id: params.id })
    .populate({
      path: 'thoughts',
      select: '-__v'
    })
    .populate('Reactions')
    .select('-__v')
    .then(dbThoughtsData => {
      if (!dbThoughtsData) {
        res.status(404).json({ message: 'No Thoughts found with this id!' });
        return;
      }
      res.json(dbThoughtsData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},

  // createThoughts
  createThoughts({ body }, res) {
    Thoughts.create(body)
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => res.status(400).json(err));
  },

// update Thoughts by id
updateThoughts({ params, body }, res) {
  Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbThoughtsData => {
      if (!dbThoughtsData) {
        res.status(404).json({ message: 'No Thoughts found with this id!' });
        return;
      }
      res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
},

addReactions({ params, body }, res) {
  Thoughts.findOneAndUpdate({ _id: params.id }, {$addToSet: {Reactions: req.params.reactionsId}}, { new: true, runValidators: true })
    .then(dbThoughtsData => {
      if (!dbThoughtsData) {
        res.status(404).json({ message: 'No Thoughts found with this id!' });
        return;
      }
      res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
},

  // delete Thoughts
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: "No Thoughts found with this id!" });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => res.status(400).json(err));
  },


deleteReactions({ params, body }, res) {
  Thoughts.findOneAndUpdate({ _id: params.id }, {$pull: {Reactions: req.params.reactionsId}}, { new: true, runValidators: true })
    .then(dbThoughtsData => {
      if (!dbThoughtsData) {
        res.status(404).json({ message: 'No Thoughts found with this id!' });
        return;
      }
      res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err));
},
};

module.exports = ThoughtsController;