const { User } = require('../models');
const { db } = require('../models/User');

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
  getUserById(req, res) {
    User.findOne({ _id: req.params.userId })
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

  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user exists with this id!' })

        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      })
  },
  //add a new friend to list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res, status(404).json({ message: 'No user with this id exists' })
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //delete friend from friends list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true })
      .then((dbFriendData) => {
        if (!dbFriendData) {
          return res, status(404).json({ message: 'No user with this id exists' })
        }
        res.json(dbFriendData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // delete user 
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUserData) => {
        if (!dbUserData) {
          return res.status(404).json({ message: 'No user with this id!' });
        }

        
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User deleted!' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });

  }
}

module.exports = userController;
