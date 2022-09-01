const express = require("express");
const router = express.Router();

const newsController = require("../controllers/newsControllers");

//Redirecionam para o respectivo controlador e as operacoes desejadas
router.get("/", newsController.home);
router.get("/:slug", newsController.newsPage);

module.exports = router;
