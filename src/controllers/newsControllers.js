//Importar schema do mongo
const Posts = require("../models/post");

//Retorna staus do servidor
const home = (req, res) => {
  if (req.query.busca == null) {
    //importa noticias da colecao
    Posts.find({})
      .sort({ "_id": -1 }) //ordem decrescente
      .exec(function (error, posts) {
        console.log(posts[0]);
        res.render("home.html", { news: posts }); //passando posts dinamicamente para a pagina home
      });
  } else {
    res.render("busca.html", {});
    //res.json(req.query.busca);
  }
};

const newsPage = (req, res) => {
  //res.send(req.params.slug);
  res.render("single-news.html", {});
};

module.exports = {
  home,
  newsPage,
};
