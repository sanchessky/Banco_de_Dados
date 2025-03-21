Autor: Thiago Sanches<br>
Instagram: https://www.instagram.com/espetacular_sanches<br>
LinkedIn Thiago Sanches: https://www.linkedin.com/in/thiagosanches07/<br>
Github: https://github.com/sanchessky<br>
Data de criação: 20/03/2025<br>
Atualização: 21/03/2025<br>

## 1. Parte II Tutorial

### Explicação:

#### 1. **Criptografando a Senha com Bcrypt:**

A criptografia de senhas é uma etapa essencial para garantir a segurança dos dados dos usuários. No seu código, usamos o bcrypt.hash() para criptografar a senha antes de armazená-la no banco de dados, o que impede que a senha seja salva de forma legível. 

- A função bcrypt.hash() recebe dois parâmetros: a senha original e o número de "salt rounds" (12 no caso), que é o número de vezes que o algoritmo irá aplicar a transformação. Quanto maior o número de "salt rounds", mais segura (e lenta) será a criptografia.
- A função é assíncrona, então, usamos um *callback* para lidar com o resultado ou erro da criptografia.
  
No código:

```javascript
bcrypt.hash(req.body.senha, 12, (error, novasenha) => {
    if (error) {
        return res.status(500).send({ msg: `Erro ao tentar cadastrar. Tente novamente mais tarde.` });
    } else {
        // Substituindo a senha pela versão criptografada.
        req.body.senha = novasenha;

        // Inserção no banco de dados.
        con.query("INSERT INTO clientes SET ?", req.body, (error, result) => {
            if (error) {
                return res.status(400).send({ msg: `Erro ao se cadastrar. ${error}` });
            }
            res.status(201).send({ msg: `Cliente cadastrado`, payload: result });
        });
    }
});
```

- Aqui, o código recebe a senha via req.body.senha, criptografa e depois substitui a senha original pela versão criptografada (novasenha).
- Após isso, a senha criptografada é salva no banco de dados, garantindo que a senha real nunca seja armazenada de forma visível.

#### 2. **Função de Atualização do Cliente:**

Na segunda parte, temos a função responsável pela atualização dos dados de um cliente. Essa função usa o método PUT, que é adequado para atualizações de recursos existentes.

- Antes de tentar atualizar, o código verifica se o id do cliente foi fornecido corretamente (req.params.id). Se não for fornecido ou for inválido, retornamos um erro de status 400 (Bad Request).
- A query SQL UPDATE é usada para atualizar os dados do cliente no banco de dados. O valor de req.body (o corpo da requisição) é passado como o novo valor para os campos da tabela, e req.params.id é usado para localizar o cliente a ser atualizado.

```javascript
app.put("/atualizar/:id", (req, res) => {
    if (req.params.id == 0 || req.params.id == null) {
        return res.status(400).send({ msg: `Não foi possível atualizar. Por favor, você precisa fornecer o id.` });
    }
    con.query("UPDATE clientes SET ? WHERE id = ?", [req.body, req.params.id], (error, result) => {
        if (error) {
            return res.status(500).send({ msg: `Erro ao tentar atualizar: ${error}` });
        }
        res.status(200).send({ msg: `Cliente atualizado`, payload: result });
    });
});
```

#### 3. **Função para Apagar Cliente:**

Agora, temos a função para apagar um cliente do banco de dados. Utilizamos o método `DELETE`, que é a prática recomendada para exclusões de recursos.

- O código verifica se o `id` foi fornecido corretamente (`req.params.id`), retornando um erro de status 400 caso contrário.
- Em seguida, executa a query SQL `DELETE` para excluir o cliente com o `id` fornecido.

```javascript
app.delete("/apagar/:id", (req, res) => {
    if (req.params.id == 0 || req.params.id == null) {
        return res.status(400).send({ msg: `Não foi possível apagar. Por favor, fornecer o id.` });
    }
    con.query("DELETE FROM clientes WHERE id = ?", req.params.id, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: `Erro ao tentar apagar: ${error}.` });
        }
        res.status(204).send({ msg: "Cliente apagado" });
    });
});
```

#### 4. **Função de Autenticação de Login (Login):**

Por fim, a função de login verifica se o usuário forneceu a senha correta. Essa etapa envolve duas verificações principais: primeiro, verificamos se o nome de usuário existe no banco de dados; em seguida, comparamos a senha fornecida com a versão criptografada armazenada.

- Usamos o bcrypt.compare() para comparar a senha fornecida com a senha criptografada no banco de dados.
- Se a senha for correta, o usuário é autenticado com sucesso e a mensagem de sucesso é retornada.
- Caso a senha não corresponda ou o usuário não seja encontrado, um erro é retornado.

```javascript
app.post("/login", (req, res) => {
    con.query("SELECT * FROM clientes WHERE usuario = ?", req.body.usuario, (error, result) => {
        if (error) {
            return res.status(500).send({ msg: `Erro ao tentar logar: ${error}` });
        } else if (result[0] == null) {
            return res.status(400).send({ msg: `Usuário ou senha errada.` });
        } else {
            bcrypt.compare(req.body.senha, result[0].senha).then((igual) => {
                if (!igual) {
                    res.status(400).send({ msg: `Usuário ou senha errada.` });
                } else {
                    res.status(200).send({ msg: `Usuário logado` });
                }
            }).catch(() => res.status(500).send({ msg: `Erro na verificação da senha.` }));
        }
    });
});
```

- A função de login primeiro consulta o banco para obter o usuário. Caso o usuário não exista ou haja erro, a função retorna uma resposta de erro.
- Se o usuário for encontrado, a senha fornecida é comparada com a senha armazenada. Se a senha não corresponder, o login falha.

```JSON
{
 "usuario": "thiagoasd",
 "senha": "12345678"
}
```

### Resumo:

1. **Criptografia de Senha:** Usamos o bcrypt.hash() para criptografar a senha antes de salvá-la no banco de dados. Isso aumenta a segurança da aplicação, pois as senhas não são armazenadas de forma legível.
2. **Função de Atualização:** A função app.put("/atualizar/:id") permite que os dados de um cliente sejam atualizados no banco de dados, desde que o id seja fornecido.
3. **Função de Apagar:** A função app.delete("/apagar/:id") exclui um cliente do banco de dados com base no id fornecido.
4. **Autenticação (Login):** A função app.post("/login") realiza a autenticação do usuário, verificando se a senha fornecida corresponde à versão criptografada no banco de dados.


### Observação:

- **Segurança:** Não se esqueça de garantir que suas variáveis de ambiente, como chaves de segurança e credenciais, estejam devidamente configuradas e protegidas para manter a segurança da sua aplicação.
- **Validação de Dados:** É sempre uma boa prática validar os dados recebidos, por exemplo, verificando se os campos obrigatórios estão presentes antes de realizar qualquer operação no banco de dados.
