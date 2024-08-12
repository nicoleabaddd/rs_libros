const express = require('express');
const router = express.Router();
const exchangeControllers = require('../controllers/exchangeControllers')

router.post('/exchange/', exchangeControllers.createExchange);
router.post('/exchange', exchangeControllers.getAllExchanges);
router.post('/exchange/:id', exchangeControllers.updateExchange);
router.post('/exchange/:id', exchangeControllers.deleteExchange);
router.post('/exchange/:id', exchangeControllers.getExchange);

module.exports=router;