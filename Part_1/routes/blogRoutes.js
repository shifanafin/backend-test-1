const express = require('express');
const router = express.Router();
const { addBlogPost, getAllBlogPosts} = require('../controller/blogController');


router.route('/add').post(addBlogPost);
router.route('/all').get(getAllBlogPosts);

module.exports = router;
