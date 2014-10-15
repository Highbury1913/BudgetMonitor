'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BudgetSchema = new Schema({
  name: String,
  info: String,
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
