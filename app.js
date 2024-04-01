const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const port = process.env.PORT;

const { dbConnection } = require('./database/config');

// Crea servidor
const app = express();

// Configurar CORS
app.use(cors());

// Conexion a base de datos
dbConnection();

const bookRoutes = require('./routes/book');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Rutas
app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>');
});

app.listen(port, () => {
    console.log('Server is running on port: ', port);
});

app.use('/book', bookRoutes);
