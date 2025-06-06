const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const { sequelize } = require('./models');
const authRoutes = require('./routes/auth');

const app = express();

const PORT = process.env.PORT || 10000;
const HOST = '0.0.0.0';

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// ✅ ROTA PRINCIPAL PARA TESTE NO RENDER
app.get("/", (req, res) => {
  res.send("API da Hallbet online!");
});

// ✅ INICIA O SERVIDOR E CONECTA AO BANCO
sequelize.sync().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Servidor backend rodando em http://${HOST}:${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar com o banco de dados:', err);
});
