

import mongoose from '../mongoose';

const schema = new mongoose.Schema({
  title: String,
  content: String,
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

export default mongoose.model('BlogPost', schema);
