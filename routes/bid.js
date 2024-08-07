// const express = require('express');
// const bids = express.Router();
// const Bid = require('../models/Bid');
// const AuctionItem = require('../models/AuctionItem');
// const cors = require('cors');

// bids.use(cors());

// bids.post('/', (req, res) => {
//   const bidData = {
//     amount: req.body.amount,
//     user_id: req.body.user_id,
//     auction_item_id: req.body.auction_item_id,
//   };

//   Bid.create(bidData)
//     .then(async bid => {
//       const auctionItem = await AuctionItem.findByPk(bid.auction_item_id);
//       if (bid.amount > auctionItem.current_bid) {
//         auctionItem.current_bid = bid.amount;
//         await auctionItem.save();
//       }
//       res.json({ status: 'Bid placed!', bid });
//     })
//     .catch(err => {
//       console.error('Error placing bid:', err);
//       res.status(500).json({ error: 'Error placing bid' });
//     });
// });

// bids.get('/:auction_item_id', (req, res) => {
//   Bid.findAll({
//     where: {
//       auction_item_id: req.params.auction_item_id,
//     },
//     order: [['amount', 'DESC']],
//   })
//     .then(bids => {
//       res.json(bids);
//     })
//     .catch(err => {
//       console.error('Error fetching bids:', err);
//       res.status(500).json({ error: 'Error fetching bids' });
//     });
// });

// module.exports = bids;

const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');

router.post('/place', bidController.placeBid);
router.get('/:auctionId', bidController.getBidsForAuction);

module.exports = router;



