const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  // relaciona com a collection Categoria
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

mongoose.model('posts', Post);
