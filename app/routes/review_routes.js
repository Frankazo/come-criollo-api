// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for reviews
const Restaurant = require('../models/restaurant')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { review: { title: '', text: 'foo' } } -> { review: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /reviews
// rid is the restaurant id
router.get('/reviews/:rid', requireToken, (req, res, next) => {
  Restaurant.findById(req.params.rid)
    .then(handle404)
    .then(parent => {
      return parent.reviews.map(review => review.toObject())
    })
    // respond with status 200 and JSON of the reviews
    .then(reviews => res.status(200).json({ reviews: reviews }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /reviews/5a7db6c74d55bc51bdf39793
router.get('/reviews/:rid/:id', requireToken, (req, res, next) => {
  Restaurant.findById(req.params.rid)
    .then(parent => {
      // return parent.reviews.find(review => review.id === req.params.id)
      return parent.reviews.id(req.params.id)
    })
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "review" JSON
    .then(review => res.status(200).json({ review: review.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /reviews
router.post('/reviews/:rid', requireToken, (req, res, next) => {
  // set owner of new review to be current user
  req.body.review.owner = req.user.id
  // find restaurant by id in order to add the new review into it
  Restaurant.findById(req.params.rid)
    .then(parent => {
      parent.reviews.push(req.body.review)
      return parent.save()
    })
    .then(savedParent => {
      res.status(201).json({ review: req.body.review })
    })
    .catch(next)
})

// UPDATE
// PATCH /reviews/5a7db6c74d55bc51bdf39793
router.patch('/reviews/:rid/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.review.owner

  Restaurant.findById(req.params.rid)
    .then(handle404)
    .then(parent => {
      const review = parent.reviews.id(req.params.id)
      requireOwnership(req, review)
      review.set(req.body.review)
      return parent.save()
    })
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /reviews/5a7db6c74d55bc51bdf39793
router.delete('/reviews/:rid/:id', requireToken, (req, res, next) => {
  Restaurant.findById(req.params.rid)
    .then(handle404)
    .then(parent => {
      const review = parent.reviews.id(req.params.id)
      requireOwnership(req, review)

      review.remove()
      return parent.save()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
