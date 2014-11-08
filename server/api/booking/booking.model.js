'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookingSchema = new Schema({
  _budget: {
    type: Schema.Types.ObjectId,
    ref: 'Budget'
    },
  entrytime: Date,
  addedby: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    },
  modificationtime: Date,
  modifiedby: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    },
  bookingtime: Date,
  name: String,
  necessity: String,
  category: String,
  value: Number
});

module.exports = mongoose.model('Booking', BookingSchema);
