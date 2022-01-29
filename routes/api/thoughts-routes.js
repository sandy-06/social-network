const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/api/thoughts-controller')

router
    .route('/')
    .get(getAllThoughts)
    

router
    .route('/:userId')
    .post(addThought);
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .delete(removeThought)
    .put(updateThought)

router
// /api/thoughts/:thoughtId/reactions
    .route('/:thoughtId/reactions')
    .post(addReaction)
    
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction)
    
module.exports = router;