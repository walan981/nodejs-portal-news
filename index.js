const express = require("express");
const path = require("path");
const app = express();
//Atualizacao do frontend em tempo real
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
//Banco de Dados
const mongoose = require("mongoose");

app.use(express.json()); //middleware para o express receber reqs em JSON
//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(express.urlencoded({ extended: true }));

//atualizacao frontend ao vivo
app.use(connectLiveReload());
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "/src/pages"));

//renderizar paginas html de acordo com o URL no navegador
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "/src/public")));
app.set("views", path.join(__dirname + "/src/pages/"));

//Configurar conexao com database MongoDB
mongoose
  .connect(
    "mongodb+srv://root:112233445566@cluster0.vsyxxp2.mongodb.net/portal-news?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("conectado com a database (OK)");
  })
  .catch((error) => {
    console.log(error.message);
  });

//Redirecionamento para as rotas
const usersAPI = require("./src/routes/userRoutes.js");
app.use("/", usersAPI);
const newsAPI = require("./src/routes/newsRoutes.js");
app.use("/news", newsAPI);

//Monitora mudancas no frontend
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

//Listener do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
