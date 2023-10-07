// infrastructure/orm/mongoose/repositories/BlogPostRepositoryMongo.ts

import BlogPost from "../../../domain/entities/BlogPost";
import MongooseBlogPost from "../../orm/mongoose/schemas/BlogPost";
import BlogPostRepository from "../../../domain/repositories/BlogPostRepository";
import BlogPostSTO from "../../stos/mongoose/BlogPostSTO";
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

  async merge(domainEntity: BlogPost): Promise<BlogPost | null> {
    const {
      id,
      title,
      content,
      authorId,
    } = domainEntity;
    const mongooseBlogPost = await MongooseBlogPost.findByIdAndUpdate(
      id,
      {
        title,
        content,
        author_id: authorId,
      },
      {
        new: true,
      }
    );
    return BlogPostSTO(mongooseBlogPost);
  }

  async remove(entityId: ID): Promise<boolean | null> {
    const result = await MongooseBlogPost.deleteOne({ _id: entityId });
    return result.deletedCount === 1;
  }

  async get(entityId: ID): Promise<BlogPost | null> {
    const mongooseBlogPost = await MongooseBlogPost.findById(entityId);
    if (!mongooseBlogPost) return null;
    return BlogPostSTO(mongooseBlogPost);
  }

  async find(): Promise<BlogPost[]> {
    const mongooseBlogPosts = await MongooseBlogPost.find().sort({ createdAt: -1 });
    return mongooseBlogPosts
      .map((mongooseBlogPost) => BlogPostSTO(mongooseBlogPost))
      .filter((blogPost: BlogPost | null): blogPost is BlogPost => blogPost != null);
  }
}
