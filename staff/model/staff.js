const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('mysql::memory:');
const sequelize = require("./connect");

const Staff = sequelize.define('staff', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  assign: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  create_time: {
      type: DataTypes.BIGINT,
      defaultValue: Date.now()
  },
  update_time: {
    type: DataTypes.BIGINT,
    defaultValue: Date.now()
}
}, {
  // Other model options go here
});
sequelize.sync()
// `sequelize.define` also returns the model
// console.log(Staff === sequelize.models.staff); // true

module.exports = Staff