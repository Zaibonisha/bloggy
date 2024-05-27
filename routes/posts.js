const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const validateRequest = require('../middlewares/createPostValidator');
const { updatePostValidation } = require('../middlewares/updatePostValidator');  // Import the update post validation middleware

// gets all posts
router.get('/', postsController.index);

// gets a specific post
router.get('/:post', postsController.show);

// creates a new post
router.post('/', validateRequest, postsController.store);

// updates a post
router.put('/:id', updatePostValidation, postsController.update);

// Delete a post
router.delete('/:id', postsController.delete);

module.exports = router;
