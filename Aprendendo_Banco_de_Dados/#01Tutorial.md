Autor: Thiago Sanches<br>
Instagram: https://www.instagram.com/espetacular_sanches<br>
LinkedIn Thiago Sanches: https://www.linkedin.com/in/thiagosanches07/<br>
Github: https://github.com/sanchessky<br>
Data de criação: 21/02/2025<br>
Atualização:



# **Tutorial de Banco de Dados - Aprendendo DML**

## **Introdução ao DML (Data Manipulation Language)**

O **DML** (Data Manipulation Language) é uma parte fundamental do SQL (Structured Query Language), a linguagem usada para interagir com bancos de dados relacionais. O DML permite **manipular os dados** nas tabelas de um banco de dados, ou seja, é usado para:

- **Inserir dados** (CREATE)
- **Ler dados** (READ)
- **Atualizar dados** (UPDATE)
- **Excluir dados** (DELETE)

Essas operações são conhecidas como **CRUD**:

- **C** = **CREATE** (Criar/Incluir) -> **INSERT**
- **R** = **READ** (Ler) -> **SELECT**
- **U** = **UPDATE** (Atualizar) -> **UPDATE**
- **D** = **DELETE** (Excluir) -> **DELETE**

Neste tutorial, vamos aprender como realizar essas operações em um banco de dados fictício que gerencia informações de **clientes**, **contatos**, **endereços**, **fornecedores**, **produtos**, **categorias**, e **estoque**.



## **1. Selecionando o Banco de Dados**

```sql
USE dbcasaoliveira;
```

O comando **`USE`** é usado para selecionar qual banco de dados será utilizado. No caso, estamos selecionando o banco de dados chamado **`dbcasaoliveira`** para que as próximas operações aconteçam dentro deste banco.

---

## **2. Descrevendo a Tabela `contato`**

```sql
DESC contato;
```

Com o comando **`DESC`** (ou **`DESCRIBE`**), podemos ver a estrutura de uma tabela. No caso, estamos visualizando a estrutura da tabela **`contato`**, ou seja, os nomes das colunas e os tipos de dados de cada uma delas.

---

## **3. Inserindo um Novo Contato**

```sql
INSERT INTO contato(telefone_residencial, telefone_comercial, telefone_celular, email)
VALUES("11-95512339", "11-35612818", "11-965232936", "thiago.sanches@hotmail.com");
```

Aqui, estamos inserindo um novo **contato** na tabela **`contato`**. Utilizamos o comando **`INSERT INTO`** para adicionar dados em uma tabela. Especificamos os campos (colunas) onde os dados serão inseridos, seguidos pelos valores que queremos adicionar.

---

## **4. Verificando os Dados Inseridos na Tabela `contato`**

```sql
SELECT * FROM contato;
```

Agora, com o comando **`SELECT`**, estamos lendo os dados da tabela **`contato`**. O **`*`** significa que queremos todas as colunas da tabela. Isso nos ajuda a verificar se o contato foi inserido corretamente.

---

## **5. Descrevendo a Tabela `endereco`**

```sql
DESC endereco;
```

Da mesma forma que fizemos com a tabela **`contato`**, vamos descrever a tabela **`endereco`** para ver sua estrutura e saber quais campos existem nela antes de inserir dados.

---

## **6. Inserindo um Novo Endereço**

```sql
INSERT INTO endereco(tipo_logradouro, logradouro, numero, complemento, cep, bairro, cidade, estado)
VALUES("Rua", "Marechal Tito", "35B", "Casa 12", "06528-100", "Jardim Oliveira", "São Paulo", "SP");
```

Agora estamos inserindo um novo **endereço** na tabela **`endereco`**. Cada valor corresponde a uma coluna na tabela **`endereco`**, e estamos informando o tipo de logradouro (Rua), o nome da rua (Marechal Tito), o número, o complemento, etc.

---

## **7. Verificando os Dados Inseridos na Tabela `endereco`**

```sql
SELECT * FROM endereco;
```

Esse comando **`SELECT`** vai retornar todos os registros da tabela **`endereco`**, permitindo que você verifique os dados inseridos.

---

## **8. Descrevendo a Tabela `cliente`**

```sql
DESC cliente;
```

Aqui, o comando **`DESC`** é usado novamente, mas agora estamos visualizando a estrutura da tabela **`cliente`**. Isso nos ajuda a saber como ela está organizada e quais colunas ela possui.

---

## **9. Inserindo um Novo Cliente**

```sql
INSERT INTO cliente(nome_cliente, cpf_cliente, data_nascimento_cliente, contato, endereco)
VALUES("Thiago Sanches", "335.286.448-12", "2002-01-07", 1, 1);
```

Agora estamos inserindo um novo **cliente**. O comando **`INSERT INTO`** está adicionando dados na tabela **`cliente`**. Note que estamos associando este cliente aos **contatos** e **endereços** de ID 1, que foram criados anteriormente.

---

## **10. Verificando os Dados Inseridos na Tabela `cliente`**

```sql
SELECT * FROM cliente;
```

Este comando **`SELECT`** exibe todos os dados da tabela **`cliente`**, incluindo o cliente que acabamos de cadastrar.

---

## **11. Inserindo um Novo Contato para o Fornecedor**

```sql
INSERT INTO contato(telefone_residencial, telefone_comercial, telefone_celular, email)
VALUES("", "11-35612826", "11-965232969", "thiago.sanches@empresas.com.br");
```

Aqui, estamos inserindo um novo **contato** para um fornecedor. O campo **`telefone_residencial`** está vazio, mas os outros campos possuem informações válidas.

---

## **12. Verificando os Dados na Tabela `contato`**

```sql
SELECT * FROM contato;
```

Esse comando vai listar todos os registros da tabela **`contato`**, incluindo o contato que acabamos de adicionar para o fornecedor.

---

## **13. Inserindo um Novo Endereço para o Fornecedor**

```sql
INSERT INTO endereco(tipo_logradouro, logradouro, numero, complemento, cep, bairro, cidade, estado)
VALUES("Rua", "Ministro Jesuino Cardoso", "454", "Casa 01", "04544-051", "Vila Olimpia", "São Paulo", "SP");
```

Agora estamos inserindo o **endereço** do fornecedor na tabela **`endereco`**. Cada valor corresponde a um campo específico da tabela.

---

## **14. Verificando os Dados na Tabela `endereco`**

```sql
SELECT * FROM endereco;
```

Este comando **`SELECT`** irá retornar todos os dados da tabela **`endereco`**, para que você possa verificar o endereço do fornecedor.

---

## **15. Inserindo um Fornecedor**

```sql
INSERT INTO fornecedor(razao_social, nome_fantasia, cnpj, contato, endereco)
VALUES("Sanches Industria LTDA", "Saint", "01.257.995/0001-33", 2, 2);
```

Agora estamos registrando um **fornecedor** na tabela **`fornecedor`**. O fornecedor está associado aos **contatos** e **endereços** que foram inseridos previamente, com os IDs 2 para o contato e 2 para o endereço.

---

## **16. Descrevendo a Tabela `categoria`**

```sql
DESC categoria;
```

Aqui, vamos verificar a estrutura da tabela **`categoria`**, para entender como os dados estão organizados nesta tabela e como podemos adicionar novas categorias de produtos.

---

## **17. Inserindo uma Nova Categoria de Produto**

```sql
INSERT INTO categoria(nome_categoria, descricao_categoria)
VALUES("Eletronicos", "Produtos eletronicos");
```

Estamos agora adicionando uma nova **categoria** de produtos na tabela **`categoria`**. Este comando registra a categoria **Eletrônicos**.

---

## **18. Verificando os Dados na Tabela `categoria`**

```sql
SELECT * FROM categoria;
```

Este comando **`SELECT`** retorna todos os registros da tabela **`categoria`**, permitindo que você veja a categoria que acabou de ser inserida.

---

## **19. Descrevendo a Tabela `produto`**

```sql
DESC produto;
```

Com esse comando **`DESC`**, verificamos a estrutura da tabela **`produto`** para entender os campos onde vamos inserir as informações de produtos.

---

## **20. Inserindo um Produto**

```sql
INSERT INTO produto(nome_produto, preco, data_validade, data_fabricacao, fornecedor, categoria)
VALUES("Ovo", "70.00", "2025-05-10", "2025-01-05", 1, 1);
```

Agora estamos registrando um **produto** na tabela **`produto`**. O produto inserido é um **Ovo**, com preço, validade e data de fabricação informados, além de associá-lo a um **fornecedor** e a uma **categoria**.

---

## **21. Verificando os Dados na Tabela `produto`**

```sql
SELECT * FROM produto;
```

Esse comando **`SELECT`** irá retornar todos os registros da tabela **`produto`**, mostrando o produto que acabamos de cadastrar.

---

## **22. Descrevendo a Tabela `estoque`**

```sql
DESC estoque;
```

Aqui, estamos descrevendo a tabela **`estoque`** para verificar os campos em que podemos inserir dados relacionados ao estoque dos produtos.

---

## **23. Inserindo Dados no Estoque**

```sql
INSERT INTO estoque(produto, quantidade_estoque, data_aquisicao)
VALUES(1, 30, "2025-01-20");
```

Finalmente, estamos inserindo dados na tabela **`estoque`**. Estamos associando o produto de ID 1 a uma quantidade de 30 unidades em estoque, com a data de aquisição informada.

---

Aqui está a explicação passo a passo sobre o processo de inserção e atualização de dados nas tabelas de um sistema de vendas em um banco de dados relacional, com a descrição de cada tabela e inserção de dados, usando SQL:

```markdown
# Processo de Cadastro e Venda no Sistema

## Cadastro do Cargo

Primeiramente, é necessário cadastrar o cargo do funcionário. Para isso, utilizamos a tabela `cargos`. O comando SQL para verificar a estrutura da tabela `cargos` é:

```sql
DESC cargos;
```

Em seguida, podemos inserir um cargo no banco de dados:

```sql
INSERT INTO cargos(funcao, salario, descricao_cargos, beneficios)
    VALUES("Operador de Caixa", 2500.99, "Atender os Clientes", "Vale Transporte, Vale Refeição");
```

Depois de inserir o cargo, podemos verificar os dados inseridos na tabela `cargos`:

```sql
SELECT * FROM cargos;
```

## Cadastro de Contato e Endereço do Funcionário

Antes de cadastrar o funcionário, é necessário registrar os dados de **contato** e **endereço**. 

## Cadastro do Funcionário

A tabela `funcionario` precisa ser descrita para ver sua estrutura. Para isso, utilizamos o comando:

```sql
DESC funcionario;
```

Agora, podemos inserir dados na tabela `funcionario`:

```sql
INSERT INTO funcionario(nome_funcionario, cpf_funcionario, data_nascimento_funcionario, horario_expediente, cargos, contato, endereco)
    VALUES("Oliveira Sanches", "545.478.558-77", "1989-10-02", "08:00 às 17:00", 1, 3, 3);
```

Após inserir o funcionário, podemos verificar se os dados foram corretamente registrados:

```sql
SELECT * FROM funcionario;
```

## Cadastro da Venda

Com o cargo e funcionário cadastrados, podemos realizar a venda. A tabela `venda` contém as informações sobre cada transação de venda. Para visualizar a estrutura da tabela, utilizamos:

```sql
DESC venda;
```

Agora podemos registrar a venda, associando um cliente e um funcionário:

```sql
INSERT INTO venda(cliente, funcionario)
    VALUES(1, 1);
```

Para verificar se a venda foi registrada corretamente:

```sql
SELECT * FROM venda;
```

## Detalhamento dos Itens da Venda

Após registrar a venda, podemos adicionar os itens vendidos. A tabela `itensvenda` armazena os detalhes de cada item na venda. Para ver sua estrutura, usamos o comando:

```sql
DESC itensvenda;
```

Agora podemos inserir os itens vendidos:

```sql
INSERT INTO itensvenda(venda, produto, quantidade_vendida, total)
    VALUES(1, 1, 12, 840);
```

Após inserir os itens, podemos verificar os dados na tabela `itensvenda`:

```sql
SELECT * FROM itensvenda;
```

### Cálculo do Total da Venda

Para calcular o total da venda, podemos usar a função de soma:

```sql
SELECT sum(total) FROM itensvenda;
```

### Atualização do Subtotal na Tabela de Venda

Se necessário, podemos atualizar o valor do subtotal da venda:

```sql
UPDATE venda SET subtotal = 1099.60 WHERE id_venda = 1;
```

Após a atualização, podemos verificar os dados atualizados:

```sql
SELECT * FROM venda;
```

## Registro do Pagamento

Agora que a venda foi registrada e o subtotal atualizado, podemos registrar o pagamento. Para ver a estrutura da tabela `pagamento`, usamos:

```sql
DESC pagamento;
```

Em seguida, registramos o pagamento, incluindo a forma de pagamento, valor a pagar, número de parcelas, valor por parcela e o troco (se houver):

```sql
INSERT INTO pagamento(venda, forma_pagamento, valor_pagar, parcelas, valor_parcela, troco)
    VALUES(1, "Pix", 1099.60, 1, 1099.60, 0);
```

Por fim, para verificar o pagamento registrado:

```sql
SELECT * FROM pagamento;
```

---

Este processo abrange desde o cadastro do cargo do funcionário até o registro da venda e do pagamento, proporcionando uma visão geral do fluxo de dados em um sistema de vendas.
