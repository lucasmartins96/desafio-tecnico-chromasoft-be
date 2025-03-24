'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.ENUM('PENDING', 'DONE'),
    userId: DataTypes.INTEGER,
    createdAt: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Task',
    tableName: 'task',
    underscored: true,
    timestamps: false,
  });
  return Task;
};