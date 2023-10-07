

import Joi from 'joi';

export default Joi.object({
  title: Joi.string()
    .label('Title')
    .min(2)
    .required(),

  content: Joi.string()
    .label('Content')
    .min(1)
    .required(),

  authorId: Joi.string()
    .label('Author ID')
    .required(),
}).unknown();
