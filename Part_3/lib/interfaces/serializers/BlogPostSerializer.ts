
import BlogPost from "../../domain/entities/BlogPost";
import { ServiceLocator } from "../../infrastructure/config/service-locator";
import Serializer from "./Serializer";

export default class BlogPostSerializer extends Serializer {
  _serializeSingleEntity(entity: BlogPost, serviceLocator: ServiceLocator): object {
    const blogPostObj = {
      'id': entity.id,
      'title': entity.title,
      'content': entity.content,
      'author_id': entity.authorId,
    };
    return blogPostObj;
  }
}
    