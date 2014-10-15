'use strict';

var express = require('express');
var controller = require('./booking.controller');

var router = express.Router();

router.get('/budget/:budgetid', controller.index);
//router.get('/budget/:budgetid/:startdate/:enddate', controller.timedindex);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
