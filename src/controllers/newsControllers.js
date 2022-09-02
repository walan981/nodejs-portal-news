//Importar schema do mongo
const Posts = require("../models/post");

//Retorna staus do servidor
const home = (req, res) => {
  if (req.query.busca == null) {
    Posts.find({})
      .sort({ "_id": -1 })
      .exec(function (error, posts) {
        console.log(posts[0]);
      });
    res.render("home.html", {});
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
