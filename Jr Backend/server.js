const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();



if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI no está definido en el archivo .env');
  process.exit(1); 
}

const app = express();


app.use(cors());
app.use(express.json()); 

const uploadRoutes = require('./src/routes/uploadRoutes');
app.use('/api', uploadRoutes);

app.get('/', (req, res) => {
  res.send('Hola, servidor funcionando!');
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Conectado a MongoDB'))
  .catch((err) => {
    console.error('❌ Error de conexión a MongoDB:', err.message);
    process.exit(1); 
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});