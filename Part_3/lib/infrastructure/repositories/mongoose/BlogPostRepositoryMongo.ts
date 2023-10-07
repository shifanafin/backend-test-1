import BlogPost from "../../../domain/entities/BlogPost";
import MongooseBlogPost from "../schemas/BlogPost";
import BlogPostRepository from "../../../domain/repositories/BlogPostRepository";
import BlogPostSTO from "../stos/mongoose/BlogPostSTO";
import { ID } from "../../../domain/entities/Entity";

export default class BlogPostRepositoryMongo implements BlogPostRepository {
  async persist(domainEntity: BlogPost): Promise<BlogPost | null> {
    const {
      title,
      content,
      authorId,
    } = domainEntity;
    const mongooseBlogPost = new MongooseBlogPost({
      title,
      content,
      author_id: authorId,
    });
    await mongooseBlogPost.save();
    return BlogPostSTO(mongooseBlogPost);
  }

  // Implement other methods (merge, remove, get, find) similarly
  // ...
}
