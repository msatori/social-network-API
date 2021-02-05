const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .sort({ createdAt: -1 })
            .then((dbThoughtData) => {
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    //get single thought by id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({ message: 'No thought with this id!' });
            }
            res.json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    

    //create a single thought 
    createNewThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: dbThoughtData._id } },
                    { $new: true }
                );
            })
            .then((dbuserData) => {
                if (!dbuserData) {
                    return res.status(404).json({ message: 'Thought created, No user with this id ' })
                }
                res.json({ message: ' Successfully created thought ' })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    //edit thought 
    editThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id exists' })
                }
                res.json(dbThoughtData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    //delete thought 
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id exists' })
                }

                return User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true }
                );
            })
            .then((dbuserData) => {
                if (!dbuserData) {
                    return res.status(404).json({ message: 'No thought with this id exists' })
                }
                res.json({ message: ' Successfully deleted thought ' })
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    //add a reaction to a thought 
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runvalidators: true, new: true }
        )

            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id.' });
                }
                res.json({dbThoughtData})
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    //delete reaction from thought 
    deleteReaction( req, res ) {
        Thought.findOneAndUpdate(
            { _id: req.body.thoughtId },
            { $pull: { reactions: {reactionId: req.params.reactionId} } },
            { runvalidators: true, new: true }
        )

            .then((dbThoughtData) => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought with this id.' })
                }
                res.json({dbThoughtData})
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
        
    }


};

module.exports = thoughtController;