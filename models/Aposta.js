const { DataTypes, Model } = require('sequelize');

class Aposta extends Model {
  static initModel(sequelize) {
    Aposta.init({
      partida_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_partida'
      },
      tipo_aposta: {
        type: DataTypes.ENUM('casa', 'empate', 'fora'),
        allowNull: false,
      },
      valor_apostado: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        field: 'valor'
      },
      odd: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_usuario'
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
Aposta.associate = (models) => {
  Aposta.belongsTo(models.Partida, {
    foreignKey: 'partida_id',
    as: 'Partida'
  });
};


module.exports = Aposta;
