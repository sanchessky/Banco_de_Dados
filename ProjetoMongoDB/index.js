/*    Autor: Thiago Sanches
 *    Instagram: https://www.instagram.com/espetacular_sanches
 *    LinkedIn Thiago Sanches: https://www.linkedin.com/in/thiagosanches07/
 *    Github: https://github.com/sanchessky
 *    Data de criação: 13/03/2025
 * 
 * Biblioteca para realizar as importaçoes de dados
 */
 
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")

const app = express()
// Carregar os middlwares
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("combined"))

// conexão com o servidor banco de dados
const urldb = "mongodb+srv://wssanches:123senac@dbatlas.5s38n.mongodb.net/dados?retryWrites=true&w=majority&appName=DbAtlas"
// estabelecer a conexão com o banco de dados
mongoose.connect(urldb, {useNewUrlParser:true, useUnifiedTopology:true})
// Definir a estrutura dos dados
const tabela = new mongoose.Schema({
    nomecliente:String,
    email:String,
    telefone:String,
    usuario:{type:String, unique:true},
    senha:{type:String, required:true}
})
// Criar este modelo de dados no banco mongoose (criar a tabela).
const Cliente = mongoose.model("tbcliente", tabela)
// Carregando os Endpoint / Rotas
app.get("/", (req,res) => {
   Cliente.find().then((result) => {
        res.status(200).send({dados:result})
   })
   .catch((erro) => res.status(500).send({erro}))
})

app.get("/projeto/teste", (req,res) => {
    res.send("você está em outro endpoint ")
})

app.post("/inserir", (req,res) => {
    const rs = new Cliente(req.body)
    rs.save().then((result, error) =>{
        if(error){
            return res.status(500).send({msg:"Erro ao se cadastrar"})
        }
        else{
            res.status(201).send({msg:result})
        }
    })
    .catch((er) => res.status(500).send({msg:er}))
})

// Configuração do servidor
app.listen("5000", () => console.log("Servidor Online em http://127.0.0.1:5000"))