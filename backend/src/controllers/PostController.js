const mongoose = require('mongoose');
require('../models/Post');
const Post = mongoose.model('posts');

module.exports = {
  // GET
  async read(request, response) {
    const postList = await Post.find()
      // Faz a conexão da collection de Postagem com a de Categoria
      .populate('category')
      .sort({ date: 'desc' });

    if (postList) return response.json(postList);

    return response
      .status(400)
      .json({ error: 'Houve um erro ao listar as postagens' });
  },

  // POST
  async create(request, response) {
    const { title, slug, description, content, category } = request.body;

    // ADICIONAR VALIDAÇÃO...

    const postCreated = await Post.create({
      title,
      slug,
      description,
      content,
      category,
    });

    if (postCreated) return response.json(postCreated);

    return response
      .status(401)
      .json({ error: 'Houve um erro ao salvar a postagem' });
  },

  // PUT
  async update(request, response) {
    const { id } = request.params;
    const { title, slug, description, content, category } = request.body;

    const postUpdated = await Post.findOneAndUpdate(
      { _id: id },
      {
        title,
        slug,
        description,
        content,
        category,
      },
    );

    if (postUpdated) return response.json(postUpdated);

    return response
      .status(401)
      .json({ error: 'Não foi encontrado o post para atualizar' });
  },

  // DELETE
  async delete(request, response) {
    const { id } = request.params;

    const postDeleted = await Post.findOneAndDelete({ _id: id });

    if (postDeleted) return response.json(postDeleted);

    return response
      .status(401)
      .json({ error: 'Não foi encontrado o post para deletar!' });
  },
};
