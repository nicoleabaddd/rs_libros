const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/postControllers')

router.post('/post/', postControllers.createPost);
router.post('/post', postControllers.getAllPosts);
router.post('/post/:id', postControllers.updatePost);
router.post('/post/:id', postControllers.deletePost);
router.post('/post/:id', postControllers.getPost);

module.exports=router;