const express = require('express'); 
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/userRoutes'); 
const app = express(); 
const PORT = 7777; 
app.use(bodyParser.json()); 
app.use('/api', userRoutes); 
app.listen(PORT, () => { 
 console.log(`Servidor rodando na porta ${PORT}`); 
}); 