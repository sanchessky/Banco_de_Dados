// importar o servidor express
const express = require("express")
// importar o modulo cors
const cors = require("cors")
// importar o modulo mysql
const mysql = require("mysql2")
// importar o modulo do helmet
const helmet = require("helmet")
// importar o modulo do morgan
const morgan = require("morgan")
// importar o modulo de criptografia de senhas bcrypy
const bcrypy = require("bcrypt")

// Carregando os modulos para a execução no backend
const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("combined"))

// Configurações de conexão com o banco de dados
const con = mysql.createConnection({
    host:"127.0.0.1",
    port:"3306",
    user:"root",
    password:"",
    database:"dbexpress"
})

// endpoint para o acesso
app.get("/",(req, res)=>{
    //obter os clientes que estão cadastrados nos banco de dados
    con.query("Select * from clientes",(error, result)=>{
        if (error) {
           return res.status(500).send({msg:`Erro ao tentar selecionar os cleintes. ${error}`})
        }
        res.status(200).send({payload:result})
    })
})
app.post("/cadastrar",(req, res)=>{
    con.query("Insert INTO clientes Set ?", req.body,(error, result)=>{
        if (error) {
            return res.status(400).send({msg:`Erro ao se cadastrar. ${error}`})
        }
        res.status(201).send({msg:`Cliente cadastrado`, payload:result})
    })
})
app.put("/atualizar/id:", (req, res)=>{
    res.send("PUT")
})
app.delete("/apagar/:id",(req, res)=>{
    res.send("DELETE")
})
app.listen(8000,()=>console.log("Servidor online"))