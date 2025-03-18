Autor: Thiago Sanches<br>
Instagram: https://www.instagram.com/espetacular_sanches<br>
LinkedIn Thiago Sanches: https://www.linkedin.com/in/thiagosanches07/<br>
Github: https://github.com/sanchessky<br>
Data de criação: 18/03/2025<br>


# Introdução à Criação de um Servidor com Express e Bibliotecas Complementares

## 1. Instalação das Dependências

Para dar início ao nosso estudo e criar um servidor básico, primeiro precisamos instalar algumas bibliotecas. Abra o terminal ou o prompt de comando no diretório do seu projeto e execute o seguinte comando para instalar as bibliotecas necessárias:

```bash
npm init -y
```

```bash
npm i express cors helmet morgan mysql2 bcrypt
```

### Bibliotecas instaladas:

- **express**: Um framework minimalista para criar servidores em Node.js.
- **cors**: Middleware para permitir requisições de diferentes origens (Cross-Origin Resource Sharing).
- **helmet**: Middleware para melhorar a segurança do servidor, adicionando cabeçalhos HTTP.
- **morgan**: Middleware para logar as requisições HTTP feitas ao servidor.
- **mysql2**: Cliente para interagir com bancos de dados MySQL.
- **bcrypt**: Biblioteca para criptografar senhas de maneira segura.

Você pode consultar a documentação de cada módulo na [NPM](https://www.npmjs.com/).



- [Express](https://expressjs.com/)
- [CORS](https://www.npmjs.com/package/cors)
- [Helmet](https://www.npmjs.com/package/helmet)
- [Morgan](https://www.npmjs.com/package/morgan)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
## 2. Criando o Arquivo index.js

Agora que já instalamos as dependências, vamos criar o arquivo index.js, onde configuraremos o servidor e as rotas.

### Estrutura Básica do Arquivo `index.js`

```javascript
// Importar o servidor express
const express = require("express");
// Importar o módulo cors
const cors = require("cors");
// Importar o módulo mysql2
const mysql = require("mysql2");
// Importar o módulo helmet
const helmet = require("helmet");
// Importar o módulo morgan
const morgan = require("morgan");
// Importar o módulo de criptografia de senhas bcrypt
const bcrypt = require("bcrypt");

// Carregando os módulos para a execução no backend
const app = express();

// Usando o middleware cors para permitir requisições de outras origens
app.use(cors());

// Usando o JSON
app.use(express.json())

// Usando o helmet para aumentar a segurança do servidor
app.use(helmet());

// Usando o morgan para logar as requisições
app.use(morgan("combined"));

// Definindo o endpoint GET (padrão)
app.get("/", (req, res) => {
    res.send("GET");
});

// Definindo o endpoint POST para cadastrar usuários
app.post("/cadastrar", (req, res) => {
    res.send("POST");
});

// Definindo o endpoint PUT para atualizar um item, utilizando o ID
app.put("/atualizar/id:", (req, res) => {
    res.send("PUT");
});

// Definindo o endpoint DELETE para apagar um item pelo ID
app.delete("/apagar/:id", (req, res) => {
    res.send("DELETE");
});

// Iniciando o servidor na porta 8000
app.listen(8000, () => console.log("Servidor online"));
```

### Explicação do Código

1. **Importação das Bibliotecas**:
   - Usamos o require() para importar os módulos necessários.
   - O Express é a base para criar o servidor, o CORS permite que o servidor aceite requisições de diferentes origens, o Helmet aumenta a segurança, o Morgan registra logs das requisições, o MySQL2 é para interagir com o banco de dados MySQL e o Bcrypt é utilizado para criptografar senhas.


3. **Rotas HTTP**:
   - **GET**: Rota padrão que será acessada via navegador ou outras ferramentas para testes.
   - **POST**: Rota que pode ser usada para cadastrar novos dados (como usuários).
   - **PUT**: Rota para atualizar dados existentes.
   - **DELETE**: Rota para excluir dados específicos utilizando o ID.

4. **Iniciando o Servidor**:
   - O servidor é iniciado na porta 8000 com o comando app.listen(8000, () => console.log("Servidor online"));.
   - O console.log() exibe uma mensagem no terminal quando o servidor está ativo.

## 3. Próximos Passos

### 3.1. Criar um Banco de Dados no MySQL Workbench

Agora, vamos configurar um banco de dados MySQL e uma tabela para armazenar informações. Para isso, siga as instruções abaixo.

1. **Abra o MySQL Workbench** e faça login na sua instância de banco de dados.
2. **Crie o banco de dados** e a tabela clientes executando os seguintes comandos SQL:

```sql
-- Criar o banco de dados
CREATE DATABASE dbexpress;

-- Usar o banco de dados criado
USE dbexpress;

-- Criar a tabela 'clientes'
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,  
    nome VARCHAR(50) NOT NULL,          
    email VARCHAR(100) NOT NULL UNIQUE, 
    usuario VARCHAR(30) NOT NULL UNIQUE,
    senha VARCHAR(200) NOT NULL,        
    datacadastro DATETIME DEFAULT CURRENT_TIMESTAMP()  
);
```
 ## 3.6. Configuração de Conexão com o Banco de Dados MySQL

Para conectar o seu servidor Express ao banco de dados MySQL, abaixo está a configuração da conexão com o banco de dados:

### Código de Conexão:

```javascript
// Configurações de conexão com o banco de dados MySQL
const con = mysql.createConnection({
    host: "127.0.0.1",    // Endereço do servidor MySQL (localhost)
    port: "3306",         // Porta padrão do MySQL
    user: "root",         // Usuário do MySQL
    password: "",         // Senha do MySQL (em branco, se não tiver)
    database: "dbexpress" // Nome do banco de dados
});
```

### Código da Linha 29 do arquivo index.js Atualizado:
```javascript
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
    con.query("Insert INTO clientes Set ?", 
    req.body,(error, result)=>{
        if (error) {
            return res.status(400).send({msg:`Erro ao se cadastrar. ${error}`})
        }
    })
})
```
## Configuração do Thunder Client para Testar

Agora, você pode testar a inserção de um cliente via **Thunder Client** no **VS Code**.

### Passo 1: Instalar o Thunder Client

1. Abra o **VS Code**.
2. Vá até a aba de **Extensões** no VS Code (ícone de quadrado no menu lateral).
3. Busque por **Thunder Client**.
4. Clique em **Install** para instalar a extensão.

### Passo 2: Criar uma Nova Requisição

1. Após instalar, clique no ícone do **Thunder Client** na barra lateral esquerda do VS Code.
2. Clique em **New Request** para criar uma nova requisição.
3. Selecione o método **POST** e insira a URL:
```
http://localhost:8000/cadastrar
```

### Passo 3: Definir o Corpo da Requisição

1. Na aba **Body** do Thunder Client, selecione **JSON**.
2. Insira o seguinte corpo de requisição:

```json
{
 "nome": "thiago",
 "email": "thiago@teste.com",
 "usuario": "thiago",
 "senha": "1234567"
}