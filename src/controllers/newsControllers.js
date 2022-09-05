//Importar schema do mongo
const Posts = require("../models/post");

//Retorna staus do servidor
const home = (req, res) => {
  if (req.query.busca == null) {
    //importa noticias da colecao
    Posts.find({})
      .sort({ "date": -1 }) //ordem decrescente
      .limit(7)
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
  Posts.findOneAndUpdate(
    { slug: req.params.slug },
    { $inc: { views: 1 } },
    { new: true },
    function (err, response) {
      console.log(response);
      res.render("singleNews", { news: response });
    }
  );
  // res.render("single-news.html", {});
};


const insertNewPost = async(req, res) =>{
  const newPost = new Posts({
    titulo: req.body.titulo,
    imagem: req.body.imagem,
    categoria: req.body.categoria,
    conteudo: req.body.conteudo,
    slug: req.body.slug,
    autor: req.body.autor,
    views: 0,
    date: Date().toString(),
  });
  try {
    await newPost.save(function(err,post){
      res.send(`Post salvo ${post._id} com sucesso!`)
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  home,
  newsPage,
  insertNewPost,
};
