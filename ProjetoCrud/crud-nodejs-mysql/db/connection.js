const mysql = require('mysql2'); 
const connection = mysql.createConnection({ 
 host: '127.0.0.1', 
 port:"3306",
 user: 'root', 
 password: '',  
 database: 'crud_db' 
})
connection.connect((err) => { 
 if (err) throw err;
 console.log('Conectado ao MySQL!');
});
module.exports = connection