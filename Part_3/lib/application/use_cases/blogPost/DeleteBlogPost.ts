
import { ServiceLocator } from '../../../infrastructure/config/service-locator';
import BlogPost from '../../../domain/entities/BlogPost';
import { ID } from '../../../domain/entities/Entity';

export default async function DeleteBlogPost(blogPostId: ID, serviceLocator: ServiceLocator): Promise<BlogPost | null> {
  return serviceLocator.blogPostRepository.remove(blogPostId);
}
