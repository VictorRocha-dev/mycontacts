const CategoryRepository = require('../repositories/CategoryRepository');

class CaregoryController {
  async index(req, res) {
    const { orderBy } = req.query;
    const category = await CategoryRepository.findAll(orderBy);
    res.json(category);
  }

  async store(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const caregory = await CategoryRepository.create({ name });

    res.json(caregory);
  }

  async show(req, res) {
    // obter UM registro
    const { id } = req.params;
    const category = await CategoryRepository.findById(id);

    if (!category) {
      // 404: not found
      return res.status(404).json({ error: 'User not Found' });
    }

    res.json(category);
  }

  async update(req, res) {
    // editar um registros
    const { id } = req.params;
    const name = req.body;

    const categoryExists = await CategoryRepository.findById(id);
    if (!categoryExists) {
      return res.status(404).json({ error: "This category don't exists" });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const category = await CategoryRepository.update(id, {
      name,
    });

    res.json(category);
  }

  async delete(req, res) {
    // deletar um registro
    const { id } = req.params;

    await CaregoryController.delete(id);
    // 204: no content
    res.sendStatus(204);
  }
}

module.exports = new CaregoryController();
