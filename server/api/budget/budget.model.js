'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BudgetSchema = new Schema({
  name: String,
  info: String,
  icon: String,
  _owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    },
  access: [{
    _userid: Schema.Types.ObjectId
  }],
  interval: String,
  intervaldata: [{startdate:Date, budget: Number}],
  currencySymbol: String,
},
{
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

/**
 * Virtuals
 */

// Latest budget information
BudgetSchema
  .virtual('latestBudget')
  .get(function() {
    var lastInterval = this.intervaldata[this.intervaldata.length -1];
    return {
      'startdate': lastInterval.startdate,
      'budget': lastInterval.budget,
      'interval': this.interval
    };
  });


/**
 * Validations
 */

// Validate budget
BudgetSchema
  .path('access')
  .validate(function(access) {
    return (access.length > 0);
  }, 'Needs at least one user in access list');


var validatePresenceOf = function(value) {
  return value && value.length;
};

var validateObjectId = function(value) {
  return value;
};


/**
 * Pre-save hook
 */
BudgetSchema
  .pre('save', function(next) {
    if (!this.isNew) return next();

    if (!validatePresenceOf(this.access))
      next(new Error('Missing access list.'));
    else if (!validateObjectId(this._owner))
      next(new Error('Missing owner'));
    else
      next();
  });


module.exports = mongoose.model('Budget', BudgetSchema);
