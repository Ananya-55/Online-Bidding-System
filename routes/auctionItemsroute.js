const express = require('express')
const auctions = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const Auction_item = require('../models/AuctionItem')
auctions.use(cors())

process.env.SECRET_KEY = 'secret'

  

    auctions.post('/create-auction', (req, res) => {
    
      const { user_id, title, starting_bid, end_date } = req.body;
  if (!req.body.title || !req.body.starting_bid || !req.body.end_date) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    
  } 

  // Create an AuctionItem
  const auctionItem = {
    user_id: user_id,
    title: title,
    description: req.body.description,
    starting_bid: starting_bid,
    current_bid: req.body.current_bid ? req.body.current_bid : 0,
    end_date: end_date
  };

  // Save AuctionItem in the database
  Auction_item.create(auctionItem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the AuctionItem."
      });
    });

});

// auctions.get('/:id', (req, res) => {
//   const id = req.params.id;
//   const user_id = req.body.user_id;
//   Auction_item.findByPk(id)
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find AuctionItem with id=${id}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving AuctionItem with id=" + id
//       });
//     });
// });

auctions.put('/update-auction', (req, res) => {
  const { user_id, title, description, starting_bid, current_bid, end_date } = req.body;

  Auction_item.update(
    { description, starting_bid, current_bid, end_date },
    {
      where: { user_id: user_id, title: title }
    }
  )
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AuctionItem was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update AuctionItem with title=${title} and user_id=${user_id}. Maybe AuctionItem was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating AuctionItem with title=" + title + " and user_id=" + user_id
      });
    });
});

// Delete Auction by Title and User ID
auctions.delete('/delete-auction', (req, res) => {
  const { user_id, title } = req.body;

  Auction_item.destroy({
    where: { user_id: user_id, title: title }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AuctionItem was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete AuctionItem with title=${title} and user_id=${user_id}. Maybe AuctionItem was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete AuctionItem with title=" + title + " and user_id=" + user_id
      });
    });
});

// View all AuctionItems for a specific user
auctions.get('/user/:user_id', (req, res) => {
  const user_id = req.params.user_id;

  Auction_item.findAll({ where: { user_id: user_id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving AuctionItems for user_id=" + user_id
      });
    });
});
module.exports = auctions;