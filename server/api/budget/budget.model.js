'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BudgetSchema = new Schema({
  name: String,
  info: String,
  ownerid: Scheme.Types.ObjectId,
  interval: String,
  intervaldata: [{startdate:Date, budget: Number}],
});

module.exports = mongoose.model('Budget', BudgetSchema);
