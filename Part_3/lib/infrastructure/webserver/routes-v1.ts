import { Router } from 'express';

import AuthRoutes from '../../interfaces/routes/v1/auth';
import UsersRoutes from '../../interfaces/routes/v1/users';
import BlogPostRoutes from '../../interfaces/routes/v1/blogPost'; 

const router = Router();

router.use('/auth', AuthRoutes);
router.use('/users', UsersRoutes);
router.use('/blog-posts', BlogPostRoutes); 


export default router;
