const { DataTypes, Model } = require('sequelize');

class Partida extends Model {
  static initModel(sequelize) {
    Partida.init({
      time_casa: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time_fora: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_hora: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      odd_casa: DataTypes.DECIMAL(5,2),
      odd_empate: DataTypes.DECIMAL(5,2),
      odd_fora: DataTypes.DECIMAL(5,2),
    }, {
      sequelize,
      modelName: 'Partida',
      tableName: 'partidas',
      timestamps: false,
    });
  }
}

module.exports = Partida;
