const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

const User = require('./User');
const Partida = require('./Partida');
const Aposta = require('./Aposta');

User.initModel(sequelize);
Partida.initModel(sequelize);
Aposta.initModel(sequelize);
Aposta.associate({ Partida });


module.exports = { sequelize, User, Partida, Aposta };
