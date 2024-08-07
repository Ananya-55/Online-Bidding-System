
const Sequelize = require('sequelize')
const db = require('../database/db.js')

const User = require('./User');


module.exports = db.sequelize.define('AuctionItem', {
  item_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'user_id',
    },
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  starting_bid: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  current_bid: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
},
{
  timestamps: false,
  tableName: 'auctionitems'
}
);


