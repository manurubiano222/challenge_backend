const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/db'); 

dotenv.config();

if (!process.env.MONGO_URI) {
    console.error('Error: MONGO_URI no está definido en el archivo .env');
    process.exit(1);
}

const app = require('./src/app');

app.get('/', (req, res) => {
    res.send('Hola, servidor funcionando!');
});

// Conecta a MongoDB
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});