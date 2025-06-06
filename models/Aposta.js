const { DataTypes, Model } = require('sequelize');

class Aposta extends Model {
  static initModel(sequelize) {
    Aposta.init({
      id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_partida: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tipo_aposta: {
        type: DataTypes.ENUM('casa', 'empate', 'fora'),
        allowNull: false,
      },
      valor: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      odd: {
        type: DataTypes.DECIMAL(5,2),
        allowNull: false,
      },
      resultado: {
        type: DataTypes.ENUM('pendente', 'ganhou', 'perdeu'),
        defaultValue: 'pendente',
      },
    }, {
      sequelize,
      modelName: 'Aposta',
      tableName: 'apostas',
      timestamps: true,
      createdAt: 'criado_em',
      updatedAt: false,
    });
  }
}

module.exports = Aposta;
