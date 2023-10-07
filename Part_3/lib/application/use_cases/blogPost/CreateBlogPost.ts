import { ServiceLocator } from '../../../infrastructure/config/service-locator';
import BlogPost from '../../../domain/entities/BlogPost';
import BlogPostValidator from '../../../domain/validators/BlogPostValidator';

export default async function CreateBlogPost(data: any, serviceLocator: ServiceLocator): Promise<BlogPost | null> {
  await BlogPostValidator.tailor('create').validateAsync(data);
  
  const blogPost = new BlogPost({
    title: data.title,
    content: data.content,
    authorId: data.authorId,
  });

  return serviceLocator.blogPostRepository.persist(blogPost);
}