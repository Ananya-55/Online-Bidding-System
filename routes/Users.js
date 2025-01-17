const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/User')
users.use(cors())

process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  };

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
          }
          userData.password = hash;
          User.create(userData)
            .then(user => {
              res.json({ status: user.email + ' Registered!' });
            })
            .catch(err => {
              console.error('Error creating user:', err); // Log error details
              res.status(500).json({ error: 'Error creating user' });
            });
        });
      } else {
        res.status(400).json({ error: 'User already exists' });
      }
    })
    .catch(err => {
      console.error('Error finding user:', err); // Log error details
      res.status(500).json({ error: 'Error finding user' });
    });
});

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          });
          res.send(token);
        } else {
          res.status(400).json({ error: 'Invalid password' });
        }
      } else {
        res.status(400).json({ error: 'User does not exist' });
      }
    })
    .catch(err => {
      console.error('Error logging in:', err); // Log error details
      res.status(500).json({ error: 'Error logging in' });
    });
});

module.exports = users;
