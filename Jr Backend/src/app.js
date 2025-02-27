const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const uploadRoutes = require('./routes/uploadRoutes');
app.use('/api', uploadRoutes);

module.exports = app;