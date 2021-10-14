const { User } = require('../models');

//user routes
const userController = {
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thought',
        select: '-__v'
      })

      .select('-__v').then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },



  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
       .populate({
           path: 'thoughts',
           select: '-__v'
        })
        .populate ({
            path: 'friends',
            select: '-__v'
        })
       .select('-__v').then(dbUserData => res.json(dbUserData))
       .catch(err => {
           console.log(err)
           res.status(500).json(err)
    });
 },



 createUser({ body }, res) {
     User.create(body)
 .then(dbUserData => res.json(dbUserData))
     .catch(err => res.json(err));
 },



updateUser({ params, body}, res) {
    User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true})
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No ID found' });
            return;
        }
        res.json(dbUserData);
    })
       .catch(err => res.json(err))
},



deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id }).then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No ID found' });
        return;
    }
    res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err))
},


addFriend({ params }, res) {
  User.findOneAndUpdate(
    { _id: params.id },
    { $addToSet: { friends: params.friendsId } },
    { new: true }
  )
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(400).json(err));
},

removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendsId } },
      { new: true }
    ).then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No ID found' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
};



module.exports = userController;