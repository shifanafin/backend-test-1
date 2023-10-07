
import { ServiceLocator } from '../../../infrastructure/config/service-locator';
import BlogPost from '../../../domain/entities/BlogPost';
import { ID } from '../../../domain/entities/Entity';

export default async function UpdateBlogPost(data: any, serviceLocator: ServiceLocator): Promise<BlogPost | null> {
  const { id, title, content, authorId } = data;
  const blogPost = await serviceLocator.blogPostRepository.get(id);

  if (!blogPost) {
    throw new Error('Blog post not found');
  }

  blogPost.title = title ?? blogPost.title;
  blogPost.content = content ?? blogPost.content;
  blogPost.authorId = authorId ?? blogPost.authorId;

  return serviceLocator.blogPostRepository.merge(blogPost);
}
