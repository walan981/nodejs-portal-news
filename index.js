const express = require("express");
//var bodyParser = require("body-parser");
const path = require("path");
const app = express();
//Atualizacao do frontend em tempo real
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

app.use(express.json()); //middleware para o express receber reqs em JSON

//Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option
app.use(express.urlencoded({ extended: true }));

app.use(connectLiveReload());

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "/src/pages"));

//renderizar paginas html de acordo com o URL no navegador
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(path.join(__dirname, "/src/public")));
app.set("views", path.join(__dirname + "/src/pages/"));

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server started on PORT ${PORT}`);
});
