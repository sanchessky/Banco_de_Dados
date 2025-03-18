/**
 * Modelo de dados para construção das coleções("tabelas")
 * Clientes
 */
 //importaçoes do recurso fremework mongosse
 const Module = require('module')
const {model, Schema} = require('mongoose')


 //criação da estrutura da coleção Cliente
 const clienteSchema = new Schema({
    nomeCliente:{type:String},
    foneCliente:{type:String},
    cpf:{type:String, unique:true, index:true},
    dataCadastro:{type:Date,default:Date.new}
 },{versionKey: false})//Não versionar os dados armarzenados

 // agora realize a exportação para o main o modelo de dados 
 module.exports = model('Cliente', clienteSchema)