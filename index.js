const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const sequelize = require('./models/index');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor backend rodando na porta ${PORT}`);
  });
}).catch(err => {
  console.error('Erro ao conectar com o banco de dados:', err);
});
