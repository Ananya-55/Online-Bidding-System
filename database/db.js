require("dotenv").config();
const Sequelize = require('sequelize')
const db = {}
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  logging: console.log,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

// db.sync()
//   .then(() => {
//     console.log('Database synchronized');
//   })
//   .catch(err => {
//     console.log('Error syncing database:', err);
//   });


