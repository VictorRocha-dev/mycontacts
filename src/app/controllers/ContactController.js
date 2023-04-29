const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(req, res) {
    // listar todos os registros
    const { orderBy } = req.query;
    const contacts = await ContactsRepository.findAll(orderBy);
    res.json(contacts);
  }

  async show(req, res) {
    // obter UM registro
    const { id } = req.params;
    const contact = await ContactsRepository.findById(id);

    if (!contact) {
      // 404: not found
      return res.status(404).json({ error: 'User not Found' });
    }

    res.json(contact);
  }

  async store(req, res) {
    // criar novo registro
    const {
      name, email, phone, category_id,
    } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return res.status(400).json({ error: 'this email is alredy in use' });
    }
    const contact = await ContactsRepository.create({
      name,
      email,
      phone,
      category_id,
    });

    res.json(contact);
  }

  async update(req, res) {
    // editar um registros
    const { id } = req.params;
    const {
      name, email, phone, category_id,
    } = req.body;

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return res.status(404).json({ error: "This contact don't exists" });
    }

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    const contactByEmail = await ContactsRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return res.status(400).json({ error: 'this email is alredy in use' });
    }

    const contact = await ContactsRepository.update(id, {
      name, email, phone, category_id,
    });

    res.json(contact);
  }

  async delete(req, res) {
    // deletar um registro
    const { id } = req.params;

    await ContactsRepository.delete(id);
    // 204: no content
    res.sendStatus(204);
  }
}

module.exports = new ContactController();
