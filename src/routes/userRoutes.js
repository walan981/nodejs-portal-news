const express = require("express");
const router = express.Router();

const userController = require("../controllers/userControllers");

//Redirecionam para o respectivo controlador e as operacoes desejadas
router.get("/", userController.home);
router.get("/allUsers", userController.listUsers);
router.post("/createUser", userController.createUser);

module.exports = router;
