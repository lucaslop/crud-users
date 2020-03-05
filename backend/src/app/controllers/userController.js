import User from "../models/Users";

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }
  async show(req, res) {
    const user = await User.findByPk(req.params.id);
    return res.json(user);
  }
  async store(req, res) {
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res.status(400).json({ error: "Email já cadastrado!" });
    }
    const user = await User.create(req.body);
    return res.json(user);
  }

  async up(req, res) {
    const user = await User.findByPk(req.params.id);
    const { email } = req.body;
    if (user.email != email) {
      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        return res
          .status(400)
          .json({ error: "Já existe esse email cadastrado!" });
      }
    }
    const useredit = await user.update(req.body);

    return res.json(useredit);
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);
    const { email } = user;
    await User.destroy({ where: { email } });
    return res.json({ sucess: true });
  }
}

export default new UserController();
