
import Entity, { ID } from './Entity';

export default class BlogPost extends Entity {
  title: string;
  content: string;
  authorId: ID;

  constructor({
    id,
    title,
    content,
    authorId
  }: {
    id?: ID,
    title: string,
    content: string,
    authorId: ID,
  }) {
    super({ id });
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }
}
