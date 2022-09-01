//Retorna staus do servidor
const home = (_, res) => {
  res.json("servidor online e operante!");
};

//Le arquivo JSON
const users = require("../models/users.json");

//Cria novos users
const createUser = (req, res) => {
  const { user } = req.body;
  users.push({
    username: user.username,
    password: user.password,
  });
  res.json({ status: "user criado!" });
};

//Lista os usuarios existentes
const listUsers = (req, res) => {
  res.json(users);
};

module.exports = {
  home,
  createUser,
  listUsers,
};
