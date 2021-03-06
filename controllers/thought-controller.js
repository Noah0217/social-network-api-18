const { Thought, User } = require('../models');

//thought routes
const thoughtController = {
  getAllThoughts({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thought: _id } },
          { new: true }
        );
        //error message for ID
      }).then(dbSocialData => {
        if (!dbSocialData) {
          res.status(404).json({ message: 'No ID found' });
          return;
        }
        res.json(dbSocialData);
      }).catch(err => res.json(err));
  },


//get ID of thought
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'NO ID found' });
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });

},


//create thought
createThought({ params, body }, res) {
  Thought.create(body)
      .then(({ _id}) => {
          return User.findOneAndUpdate(
              { username: body.username },
              { $push: { thoughts: _id } },
              { new: true }
          );
      })
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No ID found'});
              return;
          }
          res.json(dbUserData);
      }) .catch(err => res.json(err));

},


//update thought
updateThought({ params, body }, res) {
  Thought.findOneAndUpdate({ _id: params.thoughtId },
     body, { new: true, runValidators: true })
      .then(dbThoughtData => {
          if (!dbThoughtData) {
              res.status(404).json({ message: 'No ID found' });
              return;
          }
          res.json(dbThoughtData);
      }) .catch(err => res.status(400).json(err));
},


//delete thought
deleteThought({ params, body}, res) {
  Thought.findOneAndDelete({ _id: params.id })
  .then(deletedThought => {
      if (!deletedThought) {
          return res.status(404).json({ message: 'No ID found'})
      }
      res.json(deletedThought);
  }).catch(err => res.json(err));
},

// add reaction
addReaction({ params, body }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $addToSet: { reactions: body } },
    { new: true }
  )
    .then((dbThoughtData) => {
      if (!dbThoughtData) {
        res.status(404).json({ message: "No thought with this id" });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch((err) => res.json(err));
},

//delete reaction
deleteReaction({ params }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { new: true }
  )
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => res.json(err));
},

};



module.exports = thoughtController;