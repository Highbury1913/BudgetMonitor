'use strict';

var express = require('express');
var controller = require('./budget.controller');

var router = express.Router();

router.get('/owner/:id', controller.owned);
router.get('/access/:id', controller.shared);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
