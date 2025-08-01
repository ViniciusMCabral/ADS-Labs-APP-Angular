const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Prato = sequelize.define("Prato", {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true 
    },
    nome: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    preco: { 
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false 
    }
  }, {
    tableName: "pratos",
    timestamps: false 
  });

  Prato.associate = (models) => {
    Prato.belongsToMany(models.Pedido, {
      through: models.PedidoPrato,
      foreignKey: "pratoId",
      as: 'pedidos'
    });
  };

  return Prato;
};