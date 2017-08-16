const Sequelize = require('sequelize');

const conn = new Sequelize('postgres://localhost:5432/tripplanner_db', {
  logging: false
});

module.exports = conn;
