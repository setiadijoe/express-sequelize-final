'use strict';
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Item.associate = function(models){
    Item.belongsToMany(models.Supplier,{through:'SupplierItem'})
    Item.hasMany(models.SupplierItem)
  }
  return Item;
};