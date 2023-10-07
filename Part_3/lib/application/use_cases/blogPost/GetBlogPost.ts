
import { ServiceLocator } from '../../../infrastructure/config/service-locator';
import BlogPost from '../../../domain/entities/BlogPost';
import BlogPostValidator from '../../../domain/validators/BlogPostValidator';

export default async function GetBlogPost(blogPostId: ID, serviceLocator: ServiceLocator): Promise<BlogPost | null> {
  return serviceLocator.blogPostRepository.get(blogPostId);
}
