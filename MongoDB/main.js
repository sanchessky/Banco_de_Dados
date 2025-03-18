/**
 * Processo Principal
 * Estudo de dados MongoDB (CRUD)
 * @author Thiago
 */

// agora no main faça a importação do modulo de conexão
const {conectar, desconectar} = require('./database.js')

//importação do modelo de dados cliente 
const clienteModel = require('./src/models/Clientes.js')

//Função para cadastrar um novo cliente 
//Atenção para trabalhar com banco de dados sempre usar async-awaint e try-catch
const salvarCliente = async(nomeCli, foneCli, cpfCli) => {
    try {
        //setar a estruta de dados com os valores
        //Obs: usar os mesmo nome da estrutura
        const novoCliente = new clienteModel({
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf:cpfCli
        })
        //A linha abaixo salva os dados no bando de dados
        await novoCliente.save()
        console.log("Cliente adicionado com sucesso")
    } catch (error) {
        console.log(error)
    }
}

//===============Função Principal=====================
const iniciarsistema = async () => {
    console.clear()
    console.log("estudo do MongoDB")
    console.log("-----------------------------------")
    await conectar()
    //CRUD 
    await salvarCliente("Thiago", "4002-8922", "12345678900")
    await desconectar()
}
iniciarsistema()

// para iniciar digite no terminal node main.js
// DANDO tudo certo irá aparecer "MongoDB conectado"