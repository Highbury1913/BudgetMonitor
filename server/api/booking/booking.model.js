'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var BookingSchema = new Schema({
  budgetid: Schema.Types.ObjectId,
  entrytime: Date,
  addedby: String,
  modificationtime: Date,
  modifiedby: String,
  bookingtime: Date,
  name: String,
  necessity: String,
  category: String,
  value: Number
});

module.exports = mongoose.model('Booking', BookingSchema);
