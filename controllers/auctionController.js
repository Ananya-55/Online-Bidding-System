const Auction = require('../models/AuctionItem');
// const Bid = require('../models/Bid');

// exports.createAuction = async (req, res) => {
//   try {
//     const { title, description, startingBid, endDate } = req.body;
//     const auction = await Auction.create({ title, description, startingBid, endDate });
//     res.status(201).json(auction);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAllAuctions = async (req, res) => {
//   try {
//     const auctions = await Auction.findAll();
//     res.status(200).json(auctions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getAuctionById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const auction = await Auction.findByPk(id, {
//       include: [Bid]
//     });
//     if (!auction) {
//       return res.status(404).json({ message: 'Auction not found' });
//     }
//     res.status(200).json(auction);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateAuction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, startingBid, endDate } = req.body;
//     const auction = await Auction.findByPk(id);
//     if (!auction) {
//       return res.status(404).json({ message: 'Auction not found' });
//     }
//     await auction.update({ title, description, startingBid, endDate });
//     res.status(200).json(auction);
//   } catch (error) {
//     res.status  (500).json({ error: error.message });
//   }
// };

// exports.deleteAuction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const auction = await Auction.findByPk(id);
//     if (!auction) {
//       return res.status(404).json({ message: 'Auction not found' });
//     }
//     await auction.destroy();
//     res.status(200).json({ message: 'Auction deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
const db = require('../models');
const AuctionItem = db.AuctionItem;
const Op = db.Sequelize.Op;

// Create and Save a new AuctionItem
exports.create = (req, res) => {
  // Validate request
  console.log(req.body);
  if (!req.body.title || !req.body.starting_bid || !req.body.end_date) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an AuctionItem
  const auctionItem = {
    user_id: req.body.user_id,
    title: req.body.title,
    description: req.body.description,
    starting_bid: req.body.starting_bid,
    current_bid: req.body.current_bid ? req.body.current_bid : 0,
    end_date: req.body.end_date
  };

  // Save AuctionItem in the database
  AuctionItem.create(auctionItem)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the AuctionItem."
      });
    });
};

// Retrieve all AuctionItems from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  AuctionItem.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving auction items."
      });
    });
};

// Find a single AuctionItem with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AuctionItem.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find AuctionItem with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving AuctionItem with id=" + id
      });
    });
};

// Update an AuctionItem by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  AuctionItem.update(req.body, {
    where: { item_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AuctionItem was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update AuctionItem with id=${id}. Maybe AuctionItem was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating AuctionItem with id=" + id
      });
    });
};

// Delete an AuctionItem with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AuctionItem.destroy({
    where: { item_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AuctionItem was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete AuctionItem with id=${id}. Maybe AuctionItem was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete AuctionItem with id=" + id
      });
    });
};

// Delete all AuctionItems from the database.
exports.deleteAll = (req, res) => {
  AuctionItem.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} AuctionItems were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all auction items."
      });
    });
};

// find all auction items with a specific user_id
exports.findAllByUser = (req, res) => {
  const user_id = req.params.user_id;
  
  AuctionItem.findAll({ where: { user_id: user_id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving auction items."
      });
    });
};
