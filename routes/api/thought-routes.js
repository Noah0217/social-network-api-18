const router = require('express').Router();

const {
    getAllThoughts,
    createThought,
    getThoughtById,
    updateThought,
    removeReaction,
    addReaction,
    deleteThought
    //route to thought controller
} = require('../../controllers/thought-controller')

router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

    router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

    router.route('/:thoughtId/reactions/')
    .delete(deleteReaction)
    .post(addReaction)

module.exports = router;