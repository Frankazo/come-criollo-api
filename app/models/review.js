const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: String,
    ref: 'restaurant',
    required: true
  }
}, {
  timestamps: true
})

module.exports = {
  Review: mongoose.model('Review', reviewSchema),
  schema: reviewSchema
}
