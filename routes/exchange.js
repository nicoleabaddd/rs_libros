const express = require('express');
const router = express.Router();
const exchangeControllers = require('../controllers/exchangeControllers');
const authenticateToken = require('../middleware/Middlewarexchange');

router.post('/createExchange', authenticateToken, exchangeControllers.createExchange);
router.post('/exchange', exchangeControllers.getAllExchanges);
router.post('/updateExchange/:id', exchangeControllers.updateExchange);
router.post('/deleteExchange/:id', exchangeControllers.deleteExchange);
router.post('/getExchange/:id', exchangeControllers.getExchange);

router.post('/me', authenticateToken, exchangeControllers.getUserProfile);

module.exports = router;