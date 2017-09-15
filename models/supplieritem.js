'use strict';
module.exports = function(sequelize, DataTypes) {
  var SupplierItem = sequelize.define('SupplierItem', {
    SupplierId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  SupplierItem.associate = models=>{
    SupplierItem.belongsTo(models.Supplier, {foreignKey: 'SupplierId'})
    SupplierItem.belongsTo(models.Item, {foreignKey: 'ItemId'})
  }
  return SupplierItem;
};