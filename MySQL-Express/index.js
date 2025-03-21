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
const bcrypt = require("bcrypt")

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
           return res.status(500).send({msg:`Erro ao tentar selecionar os clientes. ${error}`})
        }
        res.status(200).send({payload:result})
    })
})
app.post("/cadastrar",(req, res)=>{

    bcrypt.hash(req.body.senha,12,(error, novasenha)=>{
        if (error) {
            return res.status(500).send({msg:`Erro ao tentar cadastrar. Tente novamente mais tarde.`})
        } else {
            // Vamos fazer a devolução da senha criptografata para o body.
            req.body.senha = novasenha 



    con.query("Insert INTO clientes Set ?", req.body,(error, result)=>{
        if (error) {
            return res.status(400).send({msg:`Erro ao se cadastrar. ${error}`})
        }
        res.status(201).send({msg:`Cliente cadastrado`, payload:result})
    })
                
}
})
})
app.put("/atualizar/:id", (req, res)=>{
    if(req.params.id ==0 || req.params.id == null ){
        return res.status(400).send({msg:`Não foi possivel atualizar. Por favor você precisa fornecer o id.`})
    }
    con.query("update clientes set ? where id=?",[req.body,req.params.id],(error, result)=>{
        if (error) {
            return res.status(500).send({msg:`Erro ao tentar atualizar ${error}`})
        } 
            res.status(200).send({msg:`Cliente atualizado`, payload:result})
        
    })



})
app.delete("/apagar/:id",(req, res)=>{
    if(req.params.id ==0 || req.params.id == null ){
        return res.status(400).send({msg:`Não foi possivel apagar. Por favor fornecer o id.`})
    }
    con.query("delete from clientes where id=?",req.params.id,(error,result)=>{
        if (error) {
            return res.status(500).send({msg:`Erro ao tentar apagar ${error}.`})
        }
        res.status(204).send({msg:"Apagado"}) 
    })
})
app.post("/login",(req,res)=>{
    con.query("select * from clientes where usuario=?",req.body.usuario,(error,result)=>{
        if (error){
            return res.status(500).send({msg:`Erro ao tentar logar ${error}`})
        }else if(result[0] == null){
            return res.status(400).send({msg:`Usuario ou senha errada ${error}`})
        }else{
            bcrypt.compare(req.body.senha,result[0].senha).then((igual)=>{
                if (!igual){
                    res.status(400).send({msg:`Usuario ou senha errada ${error}`})
                }else{
                    res.status(200).send({msg:`Usuario logado`})
                }
            }).catch((error)=>res.status(500).send({msg:`Usuario ou senha errado`}))
        }  
    })
})



app.listen(8000,()=>console.log("Servidor online"))