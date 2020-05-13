const express = require('express')
const passport = require('passport')

const Restaurant = require('../models/restaurant')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const removeBlanks = require('../../lib/remove_blank_fields')
const requireOwnership = customErrors.requireOwnership

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
router.get('/restaurant', requireToken, (req, res, next) => {
  Restaurant.find()
    .then(restaurant => {
      return restaurant.map(res => res.toObject())
    })
    .then(restaurant => res.status(200).json({ restaurant: restaurant }))
    .catch(next)
})

// CREATE
router.post('/restaurant', requireToken, (req, res, next) => {
  req.body.restaurant.owner = req.user.id
  Restaurant.create(req.body.restaurant)
    .then(restaurant => {
      res.status(201).json({ restaurant: restaurant.toObject() })
    })
    .catch(next)
})

// SHOW
router.get('/restaurant/:id', requireToken, (req, res, next) => {
  Restaurant.findById(req.params.id)
    .then(handle404)
    .then(restaurant => res.status(200).json({ restaurant: restaurant.toObject() }))
    .catch(next)
})

// UPDATE
router.patch('/restaurant/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  // delete req.body.example.owner

  Restaurant.findById(req.params.id)
    .then(handle404)
    .then(res => {
      requireOwnership(req, res)
      return res.updateOne(req.body.restaurant)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
router.delete('/restaurant/:id', requireToken, (req, res, next) => {
  Restaurant.findById(req.params.id)
    .then(handle404)
    .then(res => {
      requireOwnership(req, res)
      res.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
