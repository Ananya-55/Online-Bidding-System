const Sequelize = require('sequelize');
const dbConfig = require('../database/db.js');

const sequelize = dbConfig.sequelize;
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./User');
db.AuctionItem = require('./AuctionItem');

module.exports = db;
