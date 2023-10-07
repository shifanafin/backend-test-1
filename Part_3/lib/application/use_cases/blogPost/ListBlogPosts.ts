
import { ServiceLocator } from '../../../infrastructure/config/service-locator';
import BlogPost from '../../../domain/entities/BlogPost';

export default async function ListBlogPosts(serviceLocator: ServiceLocator): Promise<BlogPost[]> {
  return serviceLocator.blogPostRepository.find();
}
