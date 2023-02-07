const { json } = require('body-parser');
const mongoose = require('mongoose');
require('../models/Category');
const Category = mongoose.model('categories');

module.exports = {
  // GET
  async read(request, response) {
    const categoryList = await Category.find();

    return response.json(categoryList);
  },

  // POST
  async create(request, response) {
    const { name, slug } = request.body;

    // REFORMULAR PARA UMA VALIDAÇÃO DE FORMULÁRIO REUTILIZÁVEL
    if (!name || !slug)
      return response
        .status(400)
        .json({ error: 'É necessário preencher um Nome e um Slug' });

    const categoryCreated = await Category.create({
      name,
      slug,
    });

    if (categoryCreated) return response.json(categoryCreated);

    return response
      .status(401)
      .json({ error: ' Houve um erro ao salvar a categoria!' });
  },

  // PUT
  async update(request, response) {
    const { id } = request.params;
    const { name, slug } = request.body;

    // ADICIONAR VALIDAÇÃO DE FORMULÁRIO

    const categoryUpdated = await Category.findOneAndUpdate(
      { _id: id },
      {
        name,
        slug,
      },
    );

    if (categoryUpdated) return response.json(categoryUpdated);

    return response
      .status(401)
      .json({ error: 'Não foi encontrada a categoria para atualizar!' });
  },

  // DELETE
  async delete(request, response) {
    const { id } = request.params;

    const categoryDeleted = await Category.findOneAndDelete({ _id: id });

    if (categoryDeleted) return response.json(categoryDeleted);

    return response
      .status(401)
      .json({ error: 'Não foi encontrada a categoria para deletar!' });
  },
};
