const { DataTypes, Model } = require('sequelize');

class Aposta extends Model {
  static initModel(sequelize) {
    Aposta.init({
      partida_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tipo_aposta: {
        type: DataTypes.ENUM('casa', 'empate', 'fora'),
        allowNull: false,
      },
      valor_apostado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
