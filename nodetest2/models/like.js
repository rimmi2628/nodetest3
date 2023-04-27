'use strict';
const {
  Model
} = require('sequelize');
const post = require('./post');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Like.belongsTo(models.Post,{
        foreignKey:"post_id",
        onDelete:"CASCADE",
        as:'post',
       
      });

    }
  }
  Like.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    is_like: {
      type: DataTypes.BOOLEAN,
        defaultValue: false
    },
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};