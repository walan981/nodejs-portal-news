const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    "titulo": {
      type: String,
      required: true,
    },
    "imagem": {
      type: String,
      required: true,
    },
    "categoria": {
      type: String,
      required: true,
    },
    "conteudo": {
      type: String,
      required: true,
    },
    "slug": {
      type: String,
      required: true,
    },
  },
  { collection: "posts" }
);

const post = mongoose.model("posts", postSchema);
module.exports = post;
