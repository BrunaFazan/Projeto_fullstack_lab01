//string de conexão com o banco 
//mongodb+srv://bruna_fazan:100403@cluster0.uhisvmn.mongodb.net/?retryWrites=true&w=majority


const express = require('express');
const cors = require('cors');
// conversar com o banco:
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const app = express();
app.use(express.json());
app.use(cors());

const Filme = mongoose.model("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema ({
  login: {type: String, required: true, unique: true},
  password: {type: String, required: true}
})

usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model("Usuario", usuarioSchema);


async function conectarMongo(){
 await mongoose.connect(`mongodb+srv://bruna_fazan:mongo123@cluster0.uhisvmn.mongodb.net/?retryWrites=true&w=majority`)
} 


// ponto de acesso para atender requisições get oi
app.get('/oi', (req, res) => {
    res.send('oi')
})

// ponto de acesso as requisições get filmes
app.get('/filmes', async(req, res) => {
   const filmes = await Filme.find();
   res.json(filmes);
})

//ponto de acesso para inserir um novo filme na  base persistente de dados
app.post('/filmes', async (req, res) => {
  //recupera os dados da requisição 
  const titulo = req.body.titulo;
  const sinopse = req.body.sinopse;
  //monta o objeto json
  const filme = new Filme({
    titulo: titulo,
    sinopse: sinopse
  })
  // insere o filme novo na Base de dados:
  await filme.save();
  //carregar a base atualizada
  const filmes = await Filme.find();
  res.json(filmes);
} )

app.post('/signup', async (req, res) => {
  const login = req.body.login;
  const password = req.body.password;
  const usuario = new Usuario({
    login: login, 
    password: password
  })
  const respostaDoMongo = await usuario.save();
  console.log(respostaDoMongo);
  res.end();
})

app.listen(3000, () => {
  try{
    conectarMongo();
    console.log("conexão OK e app up and running");
  }
  catch(e){
    console.log("ops: ", e);
  }
})







