

### Tutorial MongoDB com Node.js e Mongoose

#### Passo 1: Ter o MongoDB instalado e configurar o Compass
Antes de começar, é necessário ter o MongoDB instalado na sua máquina. Você também precisará configurar o **MongoDB Compass**, que é uma ferramenta gráfica para gerenciar o MongoDB.

- **Instalar MongoDB**: [Documentação oficial do MongoDB](https://www.mongodb.com/try/download/community)
- **Instalar MongoDB Compass**: [Download do MongoDB Compass](https://www.mongodb.com/try/download/compass)

Após a instalação, você pode criar uma conta no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (caso queira utilizar o banco na nuvem) e conectar-se ao seu banco de dados.

#### Passo 2: Iniciar um projeto Node.js
Abra o terminal e crie um novo projeto Node.js utilizando o comando npm init.

```bash
npm init -y
```

Este comando criará o arquivo package.json com as configurações padrão. Este arquivo é responsável por gerenciar as dependências do seu projeto.

#### Passo 3: Criar a estrutura de pasta do sistema
Agora, crie a estrutura de diretórios para o seu projeto. Algo como:

```bash
projeto/
│
├── src/
│   ├── database/
│   │   └── conexao.js
│   └── index.js
├── package.json
```

Isso criará uma estrutura simples de pasta com a pasta `src`, onde estará o código do sistema, e a subpasta `database`, onde colocaremos a conexão com o MongoDB.

#### Passo 4: Instalar o Mongoose
O próximo passo é instalar o Mongoose, que é uma biblioteca Node.js para modelar dados no MongoDB.

Execute o comando no terminal para instalar o Mongoose:

```bash
npm i mongoose
```

O Mongoose facilita a interação com o MongoDB e cria modelos de dados de forma estruturada.

#### Passo 5: Criar um módulo de conexão com o MongoDB

Agora, vamos criar um módulo para conectar e desconectar do MongoDB, garantindo que você não faça múltiplas conexões ao mesmo tempo.

Crie o arquivo conexao dentro da pasta src/database/ com o seguinte conteúdo:

```javascript
// Importação do mongoose
const mongoose = require('mongoose')

//Para cirar um banco de dados personalizado basta escolher um nome no final da String da Url (ex:dbthiago)
// Configuração do acesso ao banco de dados
const url = `mongodb+srv://adminT:123Senac@projetoestudo.5s38n.mongodb.net/DbCliente`

// Variável de apoio para validar a conexão
let conectado = false

// Método para conectar ao banco de dados
const conectar = async () => {
  // Valida se já está conectado
  if (!conectado) {
    try {
      // Conectar ao banco de dados
      await mongoose.connect(url);
      conectado = true; // Definir a variável como conectada
      console.log("MongoDB conectado");
    } catch (error) {
      console.log("Erro ao conectar ao MongoDB:", error)
    }
  }
}

// Método para desconectar do banco de dados
const desconectar = async () => {
  // Verifica se está conectado antes de tentar desconectar
  if (conectado) {
    try {
      // Desconectar do banco de dados
      await mongoose.disconnect()
      conectado = false; // Definir como desconectado
      console.log("MongoDB desconectado")
    } catch (error) {
      console.log("Erro ao desconectar do MongoDB:", error)
    }
  }
}

// Exportando os métodos para conectar e desconectar
module.exports = { conectar, desconectar }
```

### Explicação do Código:

**1. Importação do Mongoose:**
O Mongoose é importado no início para facilitar a conexão com o banco de dados.

```javascript
const mongoose = require('mongoose');
```

**2. Definição da URL de Conexão:**
Aqui, a variável url contém o link de acesso ao seu banco de dados MongoDB. Você pode obter essa URL do MongoDB Atlas, caso esteja usando o serviço na nuvem. Se estiver usando uma instância local, o URL será algo como `mongodb://localhost:27017/nomeDoBanco`.

```javascript
const url = `mongodb+srv://adminT:123Senac@projetoestudo.5s38n.mongodb.net/`
```

**3. Validação da Conexão:**
A variável conectado serve como uma flag para garantir que não tentamos conectar várias vezes ao banco de dados sem precisar. Ela começa como false, indicando que não estamos conectados.

**4. Método conectar:**
O método conectar usa mongoose.connect(url) para conectar ao MongoDB. O código só tenta se conectar se a variável conectado for false. Após a conexão bem-sucedida, a variável conectado é definida como true.

```javascript
await mongoose.connect(url)
conectado = true
console.log("MongoDB conectado")
```

Se ocorrer um erro, ele será tratado no bloco catch.

**5. Método desconecta:**
O método desconectar é responsável por desconectar do MongoDB. Ele verifica se estamos conectados antes de tentar desconectar, utilizando mongoose.disconnect(). Quando a desconexão for concluída com sucesso, a variável conectado é definida como `false`.

```javascript
await mongoose.disconnect()
conectado = false
console.log("MongoDB desconectado")
```

**6. Exportação dos Métodos:**
Por fim, os métodos conectar e desconectar são exportados para serem usados em outros arquivos do seu projeto, como no index.js.

```javascript
module.exports = { conectar, desconectar }
```

Aqui está o código e a explicação de como você pode criar o arquivo principal (main.js) para iniciar o sistema com a conexão ao MongoDB, utilizando o módulo de conexão que você criou. Vou organizar tudo em formato Markdown para você entender e aplicar no seu projeto.

### Passos para configurar o arquivo principal (main.js):

#### 1. **Importação do módulo de conexão**
Primeiro, você precisa importar os métodos conectar e desconectar do arquivo database.js, onde a lógica da conexão com o MongoDB foi definida.

No arquivo main.js, adicione a importação da seguinte forma:

```javascript
// Importando os métodos de conexão do módulo de conexão
const { conectar, desconectar } = require('./database.js')
```

#### 2. **Função principal (iniciarsistema)**
Agora, você pode criar a função iniciarsistema, que irá iniciar o sistema, conectar ao MongoDB e exibir uma mensagem no console.

```javascript
//=============== Função Principal ====================
const iniciarsistema = async () => {
    console.clear(); // Limpa o console para deixar mais organizado
    console.log("Estudo do MongoDB")
    console.log("-----------------------------------")

    // Chama a função conectar para iniciar a conexão com o MongoDB
    await conectar()
}
```

#### 3. **Chamada da função principal**
Depois de definir a função iniciarsistema, você precisa chamá-la para que ela seja executada. A chamada é feita logo após a definição da função.

```javascript
// Chama a função principal para iniciar o sistema
iniciarsistema()
```

#### 4. **Executando o arquivo no terminal**
Para rodar o sistema, basta executar o arquivo main.js no terminal com o comando:

```bash
node main.js
```

#### 5. **Resultado Esperado**
Ao rodar o código, se a conexão for bem-sucedida, você verá a seguinte mensagem no console:

```
Estudo do MongoDB
-----------------------------------
MongoDB conectado
```

#### 6. **Código Completo do main.js:**

Aqui está o código completo para o seu arquivo main.js:

```javascript
// Importando os métodos de conexão do módulo de conexão
const { conectar, desconectar } = require('./database.js')

//=============== Função Principal ====================
const iniciarsistema = async () => {
    console.clear() // Limpa o console para deixar mais organizado
    console.log("Estudo do MongoDB")
    console.log("-----------------------------------")

    // Chama a função conectar para iniciar a conexão com o MongoDB
    await conectar();


// Chama a função principal para iniciar o sistema
iniciarsistema()
```

### Explicação do código:

- **Importação**: Estamos importando o conectar e o desconectar do arquivo database.js para gerenciar a conexão com o MongoDB.
  
- **Função iniciarsistema**: Essa função é assincrona e responsável por iniciar o processo, limpar o console (para uma saída mais limpa), mostrar uma mensagem e chamar a função conectar que foi exportada de database.js.

- **console.clear()**: Limpa o console antes de exibir as mensagens para facilitar a leitura das saídas.
  
- **Execução da função**: A função iniciarsistema() é chamada ao final, o que dispara o processo de conexão com o banco de dados.

- **Rodando no terminal**: Para rodar o código, você usa o comando node main.js no terminal, e, se tudo estiver correto, verá a mensagem de conexão no console.

### Teste:
- Após executar node main.js, você deve ver a mensagem:

```
Estudo do MongoDB
-----------------------------------
MongoDB conectado
```

Isso indica que a conexão com o MongoDB foi bem-sucedida.

No desenvolvimento de sistemas, é importante tratar exceções (erros) de forma adequada para garantir que a aplicação continue funcionando ou forneça uma mensagem de erro útil para o usuário. No caso da conexão com o MongoDB usando Mongoose, pode ocorrer um erro de autenticação. Vamos ver como podemos tratar esse erro com um bloco try-catch.

## Código de Exemplo

```javascript
//try-catch - tratamento de exceções
} catch (error) {
    // se o código de erro for 8000 (autenticação)
    if (error.code === 8000) {  // Corrigido para comparação (===)
        console.log("Erro de autenticação");
    } else {
        console.log(error); // Imprime qualquer outro erro
    }
}
```

 Faça uma Atualização na estrutura do Código na Linha 65 do seu código (main.js).
```javascript
 const conectar = async () => {
    if(!conectado){
        try{
            await mongoose.connect(url) 
            conectado = true 
            console.log("MongoDB conectado")
        } catch (error){
            // se o código de erro = 8000 (autenticação)
            if(error.code = 8000){
                console.log("Erro de autenticação")
            } else {
                console.log(error)
            }
        }

    }

```

 **Importação do módulo de conexão**
Primeiro, você precisa importar os métodos conectar e desconectar do arquivo database.js, onde a lógica da conexão com o MongoDB foi definida.

No arquivo main.js, adicione a importação da seguinte forma:

```javascript
//importação do modelo de dados cliente 
const clienteModel = require('./src/models/Clientes.js')
```

Crie o arquivo Cliente.js dentro da pasta src/models/ com o seguinte conteúdo:

```javascript
/**
 * Modelo de dados para construção das coleções("tabelas")
 * Clientes
 */
 //Importaçoes do recurso fremework mongosse
const Module = require('module')
const {model, Schema} = require('mongoose')


 //Criação da estrutura da coleção Cliente
 const clienteSchema = new Schema({
    nomeCliente:{type:String},
    foneCliente:{type:String},
    cpf:{type:String, unique:true, index:true}
    dataCadastro:{type:Date,default:Date.new}
    //Adionar data automatica
 }{versionKey: false})//Não versionar os dados armarzenados

 // Agora realize a exportação para o main o modelo de dados 
 module.exports = model('Cliente', clienteSchema)
```

## Função para Cadastrar um Novo Cliente no arquivo (main.js)

Essa função tem como objetivo cadastrar um novo cliente em um banco de dados utilizando o modelo clienteModel. Ela deve ser chamada com três parâmetros: nome, telefone e CPF do cliente.

``` javascript
// Função para cadastrar um novo cliente
// Atenção para trabalhar com banco de dados sempre usar async-await e try-catch
const salvarCliente = async (nomeCli, foneCli, cpfCli) => {
    try {
        // Setar a estrutura de dados com os valores
        // Obs: usar os mesmos nomes da estrutura
        const novoCliente = new clienteModel({
            nomeCliente: nomeCli,
            foneCliente: foneCli,
            cpf: cpfCli
        })

        // A linha abaixo salva os dados no banco de dados
        await novoCliente.save()
        console.log("Cliente adicionado com sucesso")
    } catch (error) {
        console.log(error)
    }
}
```

### Parâmetros:

1. **Parâmetros**: A função recebe três parâmetros: nomeCli, foneCli e cpfCli.
2. **Criação do Novo Cliente**: Um objeto novoCliente é instanciado com os dados fornecidos.
3. **Salvamento no Banco de Dados**: A função await novoCliente.save() tenta salvar o cliente no banco de dados.


# Atualização do Código no Arquivo `main.js`

## Código Atualizado:

```javascript
//===============Função Principal=====================
const iniciarsistema = async () => {
    try {
        console.clear(); // Limpa o console para exibir as novas mensagens
        console.log("estudo do MongoDB"); // Exibe uma mensagem no console
        console.log("-----------------------------------");

        // Conectando ao banco de dados
        await conectar();

        // Realizando a operação CRUD: Salvando o cliente
        await salvarCliente("Thiago", "4002-8922", "12345678900");

    
        await desconectar();   
}


iniciarsistema();

