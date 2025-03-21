const db = require('../db/connection'); 
const bcrypt = require("bcrypt")

exports.createUser = (req, res) => {
    const { nome_usuario, email_usuario, senha_usuario } = req.body; // Desestruturação das variáveis do corpo da requisição

    bcrypt.hash(senha_usuario, 10, (err, hashedPassword) => {
        if (err) return res.status(500).send(err); 

        const sql = 'INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario) VALUES(?, ?, ?)';
        
        db.query(sql, [nome_usuario, email_usuario, hashedPassword], (err, result) => {
            if (err) return res.status(500).send(err); // Retorna erro se a inserção falhar
            
            // Retorna o id, nome e email do usuário, mas **não** a senha
            res.status(201).json({ id: result.insertId, nome_usuario, email_usuario });
        });
    });
};

exports.getUsers = (req, res) => { 
    db.query('SELECT nome_usuario, email_usuario FROM usuarios', (err, results) => { 
        if (err) return res.status(500).send(err); 
        res.json(results); 
        }); 
}; 
exports.updateUser = (req, res) => { 
    const { id } = req.params; 
    const { nome_usuario, email_usuario, senha_usuario } = req.body; 
        const sql = 'UPDATE usuarios SET nome_usuario = ?, email_usuario = ? WHERE id = ?';
            db.query(sql, [nome_usuario, email_usuario, id], (err) => { 
                if (err) return res.status(500).send(err); 
                res.json({ id, nome_usuario, email_usuario }); 
    }); 
 }
 exports.deleteUser = (req, res) => { 
    const { id } = req.params; 
    const sql = 'DELETE FROM usuarios WHERE id = ?'; 
    db.query(sql, [id], (err) => { 
    if (err) return res.status(500).send(err); 
    res.json({ message: `Usuário com ID ${id} deletado` }); 
    }); 
   }; 
exports.loginUser = (req, res) => {const { usuario, senha } = req.body; 

    con.query("SELECT * FROM usuarios WHERE nome_usuario = ?", [usuario], (error, result) => {
        if (error) {
            return res.status(500).send({ msg: `Erro ao tentar logar: ${error.message}` });
        }

        if (result === 0) {
            return res.status(400).send({ msg: 'Usuário ou senha errada' });
        }

        bcrypt.compare(senha, result[0].senha).then((igual) => {
            if (!igual) {
                return res.status(400).send({ msg: 'Usuário ou senha errada' });
            }

            res.status(200).send({ msg: 'Usuário logado com sucesso' });
        }).catch((err) => {
            res.status(500).send({ msg: 'Erro ao verificar a senha' });
        });
    });
};
