    
import BlogPost from '../../../domain/entities/BlogPost';

export default (schemaEntity: any): BlogPost | null => {
  if (!schemaEntity) return null;
  return new BlogPost({
    id: schemaEntity.id,
    title: schemaEntity.title,
    content: schemaEntity.content,
    authorId: schemaEntity.author_id,
  });
};
