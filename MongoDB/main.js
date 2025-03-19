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
        //Tratamento personalizado das exceções
        if (error.code = 11000) {
            console.log(`Erro: O  CPF ${cpfCli} ja está cadastrado`)
        } else {
            console.log
        }
    }
}
// Função para listar todos os clientes
const listarClientes = async() =>{
    try {
        const clientes = await clienteModel.find().sort({nomeCliente:1}) //.sort({nomeCliente:1}) Listar em ordem alfabetica
        console.log(clientes)
    } catch (error) {
        console.log(erro)
    }
}
// Função para buscar um cliente pelo nome

//find({nomeCliente: new RegExp(nome, i)}) ignorar na busca letras maiusculas ou minusculas (i - case insensitive)
const buscarClienteNome = async (nome) => {
    try {
        const clienteNome = await clienteModel.find({
            nomeCliente: new RegExp(nome, 'i')

        })
        console.log(clienteNome)
    } catch (error) {
        console.log(error)
    } 
}
// Função para buscar um cliente pelo CPF
const buscarClienteCPF = async (cpf) => {
    try {
        const clienteCPF = await clienteModel.find({
            cpf: new RegExp(cpf)

        })
        console.log(clienteCPF)
    } catch (error) {
        console.log(error)
    } 
}
// Função para editar os dados do cliente (Atenção!!! usar o id do cliente)
const atualizarCliente = async (id, nomeCli, foneCli,cpfCli) => {
    try {
        const clienteEditado = await clienteModel.findByIdAndUpdate(
            id,
            {
                nomeCliente: nomeCli,
                foneCliente: foneCli,
                cpf: cpfCli
            },
            {
                new: true,
                runValidators: true

            }
        )
        console.log("Dados do cliente alterados com sucesso")
    } catch (error) {
          //Tratamento personalizado das exceções
          if (error.code = 11000) {
            console.log(`Erro: O  CPF ${cpfCli} ja está cadastrado`)
        } else {
            console.log
        }
    } 
}

// Função para excluir os dados do cliente (Atenção!!! usar o id do cliente)
const excluirCliente = async (id) =>{
    try {
        const clienteDeletado = await clienteModel.findByIdAndDelete(id)
        console.log("Cliente exluido com sucesso.")
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
    //await salvarCliente("Caio", "4002-8922", "44344678770")
    //await listarClientes()
    //await buscarClienteNome("")
    //await buscarClienteCPF("12345678900")
    //await atualizarCliente("67d87dc4a9bf9567bb5d0d2a", "Thiago sanches", "(11)99999-0000", "12345678900")
    await excluirCliente("67daf6e7a5e01e720e7983fe")
    await desconectar()
}
iniciarsistema()

// para iniciar digite no terminal node main.js
// DANDO tudo certo irá aparecer "MongoDB conectado"