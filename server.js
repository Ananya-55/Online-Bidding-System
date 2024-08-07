var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/Users')

app.use('/users', Users)

var auctionItemsRoutes = require('./routes/auctionItemsroute'); 
app.use('/auction-items', auctionItemsRoutes);

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const app = express();
// const port = process.env.PORT || 5000;
// const sequelize = require('./database/db');

// app.use(bodyParser.json());
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));

// const users = require('./routes/users');
// const auctionItems = require('./routes/auctionItemsroute');
// const bids = require('./routes/bid');

// app.use('/users', users);
// app.use('/auctions', auctionItems);
// app.use('/bids', bids);


// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
//   });
// }).catch(err => {
//   console.log('Error connecting to the database:', err);
// });

