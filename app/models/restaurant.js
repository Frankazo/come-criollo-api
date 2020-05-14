const mongoose = require('mongoose')
const review = require('./review')

// Restaurant Model
const restaurantSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true
  },
  restName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  website: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviews: [ review.schema ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
