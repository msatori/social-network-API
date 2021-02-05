const router = require('express').Router();


const {
    getThoughts, 
    getThoughtById, 
    createNewThought, 
    editThought, 
    deleteThought, 
    addReaction,
    deleteReaction
} = require('../../controllers/thought-controller.js');


// api/users
router
    .route('/')
    .get(getThoughts)
    .post(createNewThought);

router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(editThought)
    .delete(deleteThought);

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;