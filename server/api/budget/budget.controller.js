'use strict';

var _ = require('lodash');
var Budget = require('./budget.model');
var mongoose = require('mongoose');

// Get list of budgets
exports.owned = function (req, res) {
  Budget.find({_owner:req.params.id}, '', function (err, budgets) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, budgets);
  });
};

// Get list of shared budgets
exports.shared = function (req, res) {
  Budget.find({'access._userid':req.params.id}, '', function (err, budgets) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, budgets);
  });
};

// Get a single budget
exports.show = function (req, res) {
  Budget.findById(req.params.id, function (err, budget) {
    if (err) {
      return handleError(res, err);
    }
    if (!budget) {
      return res.send(404);
    }
    return res.json(budget);
  });
};

// Creates a new budget in the DB.
exports.create = function (req, res) {
  Budget.create(req.body, function (err, budget) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, budget);
  });
};

// Updates an existing budget in the DB.
exports.update = function (req, res) {
  console.log('I am in.');
  // if (req.body._id) {
  //   delete req.body._id;
  // }
  Budget.findById(new mongoose.Types.ObjectId(req.body._id), function (err, budget) {
    if (err) {
      return handleError(res, err);
    }
    if (!budget) {
      console.log('I cannot find the budget.');
      return res.send(404);
    }
    var updated = budget;
    updated.name = req.body.name;
    updated.info = req.body.info;
    updated.icon = req.body.icon;
    updated.interval = req.body.interval;
    updated.intervaldata = [];
    for (var idx in req.body.intervaldata)
    {
      updated.intervaldata.push(req.body.intervaldata[idx])
    }
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, updated);
    });
  });
};

// Deletes a budget from the DB.
exports.destroy = function (req, res) {
  Budget.findById(req.params.id, function (err, budget) {
    if (err) {
      return handleError(res, err);
    }
    if (!budget) {
      return res.send(404);
    }
    budget.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
