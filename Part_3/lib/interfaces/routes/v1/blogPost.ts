// infrastructure/webserver/interfaces/routes/v1/blogPost.ts

import { Router } from 'express';
import BlogPostController from '../../controllers/BlogPostController';

const router = Router();

router.post('/', BlogPostController.createBlogPost);
router.get('/', BlogPostController.listBlogPosts);
router.get('/:id', BlogPostController.getBlogPost);
router.put('/:id', BlogPostController.updateBlogPost);
router.delete('/:id', BlogPostController.deleteBlogPost);

export default router;
