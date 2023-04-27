'use strict';
const {
  Model
} = require('sequelize');
const like = require('./like');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     
     Post.hasMany(models.Like,{
        foreignKey:"post_id",
        onDelete:"CASCADE",
       
        
      })
    }
  }
  Post.init({
    user_id: DataTypes.INTEGER,
    post_content: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};