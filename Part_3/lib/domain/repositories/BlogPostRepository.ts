
import { ID } from "../entities/Entity";
import BlogPost from "../entities/BlogPost";

export default interface BlogPostRepository {
  persist(blogPost: BlogPost): Promise<BlogPost | null>;

  merge(blogPost: BlogPost): Promise<BlogPost | null>;

  remove(entityId: ID): Promise<boolean | null>;

  get(entityId: ID): Promise<BlogPost | null>;

  find(): Promise<BlogPost[]>;
}
