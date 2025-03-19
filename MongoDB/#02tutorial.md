# Tutorial Parte II

Neste tutorial, realizar operações de CRUD. Iremos dividir o processo em etapas, explicando cada parte do código e o que está acontecendo.


## **1. Função para Listar Todos os Clientes**

Vamos começar criando uma função que lista todos os clientes do banco de dados e os exibe no console. Adicionalmente, vamos ordenar a lista de clientes em ordem alfabética.

```javascript
// Função para listar todos os clientes
const listarClientes = async () => {
    try {
        const clientes = await clienteModel.find().sort({ nomeCliente: 1 }); // Ordenando os clientes por nome em ordem alfabética
        console.log(clientes); // Exibindo os clientes encontrados
    } catch (error) {
        console.log("Erro ao listar clientes:", error); // Caso ocorra algum erro
    }
}
```

**Explicação**:
- clienteModel.find() consulta todos os clientes no banco de dados.
- .sort({ nomeCliente: 1 }) ordena os resultados de forma crescente (alfabética) com base no campo nomeCliente.



## **2. Função Principal**

Agora, vamos criar a função principal para executar o sistema. Essa função irá conectar ao banco de dados, chamar a função para listar os clientes e, por fim, desconectar do banco de dados.

```javascript
// Função principal para iniciar o sistema
const iniciarsistema = async () => {
    console.clear(); // Limpar o console
    console.log("Estudo do MongoDB");
    console.log("-----------------------------------");
    
    await conectar() // Conectar ao banco de dados MongoDB
    
  
    await listarClientes() // Listar todos os clientes
    
    await desconectar() // Desconectar do banco de dados
}

// Executando a função principal
iniciarsistema()
```

**Explicação**:
- A função `iniciarsistema` gerencia o fluxo do programa: conecta ao banco de dados, chama a função para listar os clientes, e desconecta do banco de dados ao final.



## **3. Função para Buscar um Cliente pelo Nome**

Agora, vamos criar uma função que permite buscar um cliente pelo nome, ignorando se as letras são maiúsculas ou minúsculas.

```javascript
// Função para buscar um cliente pelo nome (ignorar maiúsculas/minúsculas)
const buscarClienteNome = async (nome) => {
    try {
        // Usando uma expressão regular para realizar a busca insensível a maiúsculas e minúsculas
        const clienteNome = await clienteModel.find({
            nomeCliente: new RegExp(nome, 'i') // 'i' indica case-insensitive
        })
        console.log(clienteNome); // Exibindo os clientes encontrados
    } catch (error) {
        console.log("Erro ao buscar cliente pelo nome:", error) // Caso ocorra um erro
    }
}
```

**Explicação**:
- new RegExp(nome, 'i') cria uma expressão regular que permite a busca de forma insensível a maiúsculas ou minúsculas. Isso facilita a busca, independentemente de como o nome foi digitado.

**Exemplo de uso: Coloque na função principal**
```javascript
await buscarClienteNome("Thiago")
```

## **4. Função para Buscar um Cliente pelo CPF**

Agora, vamos criar a função para buscar um cliente pelo CPF.

```javascript
// Função para buscar um cliente pelo CPF
const buscarClienteCPF = async (cpf) => {
    try {
        // Buscando cliente pelo CPF
        const clienteCPF = await clienteModel.find({
            cpf: new RegExp(cpf) // Busca flexível para o CPF
        });
        console.log(clienteCPF); // Exibindo o cliente encontrado
    } catch (error) {
        console.log("Erro ao buscar cliente pelo CPF:", error); // Caso ocorra um erro
    }
}
```

**Explicação**:
- Usamos uma expressão regular novamente para buscar o CPF de maneira flexível. Isso permite encontrar o cliente, mesmo que o CPF esteja em um formato ligeiramente diferente.

**Exemplo de uso: Coloque na função principal**
```javascript
await buscarClienteCPF("12345678900");
```

## **5. Função para Atualizar os Dados de um Cliente**

Vamos agora criar uma função para atualizar os dados de um cliente, usando seu id para identificar o cliente a ser atualizado.

```javascript
// Função para editar os dados do cliente (Atenção!!! usar o id do cliente)
const atualizarCliente = async (id, nomeCli, foneCli, cpfCli) => {
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
        console.log("Dados do cliente alterados com sucesso");
    } catch (error) {
          // Tratamento personalizado das exceções
          if (error.code == 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`);
        } else {
            console.log(error);
        }
    } 
}
```

**Explicação**:
- A função findByIdAndUpdate encontra um cliente pelo id e atualiza os campos especificados (nome, telefone e CPF).
- O parâmetro new: true faz com que o Mongoose retorne o cliente atualizado (não o anterior).
- Usamos runValidators: true para garantir que os dados sejam validados conforme o schema.

**Exemplo de uso: Coloque na função principal**
```javascript
await atualizarCliente("67d87dc4a9bf9567bb5d0d2", "Thiago Sanches", "(11)99999-0000", "12345678900");
```

---

## **7. Função para Excluir um Cliente**

Agora, vamos criar uma função para excluir um cliente usando seu id.

```javascript
// Função para excluir os dados do cliente (Atenção!!! usar o id do cliente)
const excluirCliente = async (id) => {
    try {
        const clienteDeletado = await clienteModel.findByIdAndDelete(id);
        console.log("Cliente excluído com sucesso.")
    } catch (error) {
        console.log(error) // Caso ocorra um erro
    }
}
```

**Exemplo de uso: Coloque na função principal**
```javascript
await excluirCliente("67daf6e7a5e01e720e7983fe")
```

**Explicação**:
- A função findByIdAndDelete encontra o cliente pelo id e o exclui do banco de dados.

---



## As principais operações abordadas foram:

1. **Listagem de todos os clientes** com ordenação por nome.
2. **Busca de clientes pelo nome**, ignorando diferenças de maiúsculas e minúsculas.
3. **Busca de clientes pelo CPF**.
4. **Atualização de dados de um cliente** usando seu id.
5. **Exclusão de um cliente** com base no seu id.


