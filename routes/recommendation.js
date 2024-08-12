const express = require('express');
const router = express.Router();
const recoController = require('../controllers/recoController');

router.post('/recommendation/', recoController.createRecommendation);
router.post('/recommendation', recoController.getAllRecommendations);
router.post('/recommendation/:id', recoController.updateRecommendation);
router.post('/recommendation/:id', recoController.deleteRecommendation);
router.post('/recommendation/:id', recoController.getRecommendation);

module.exports = router;