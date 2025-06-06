const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');
const partidasRoutes = require('./routes/partidas');
const apostaRoutes = require('./routes/apostas');
const userRoutes = require('./routes/user');

const app = express();

const PORT = process.env.PORT || 10000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/partidas', partidasRoutes);
app.use('/api/apostas', apostaRoutes);
app.use('/api/user', userRoutes);

app.get("/", (req, res) => {
  res.send("API da Hallbet online!");
});

sequelize.sync().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Servidor backend rodando em http://${HOST}:${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar com o banco de dados:', err);
});
