const { User } = require('../models');

const userController = {
  // get all users
  getAllUsers(req, res) {
    User.find()
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // get one user by id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // createUser
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },

  updateUser( req, res ) {
    User.findOneAndUpdate(
      { _id: req.params.userId},
      { $set: req.body},
    )
  },
  //add a new friend to list
  addfriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet:{ friends: req.params.friendId } }, { new: true })
    .then((dbFriendData) => {
      if (!dbFriendData) {
        return res,status(404).json({ message: 'No user with this id exists'})
      }
      res.json(dbFriendData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
 //delete friend from friends list
 deleteFriend( req, res ) {
    User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId }}, { new: true }) 
      .then((dbFriendData) => {
        if (!dbFriendData) {
          return res,status(404).json({ message: 'No user with this id exists'})
        }
        res.json(dbFriendData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
 },
  // delete user 
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }
};

module.exports = userController;
