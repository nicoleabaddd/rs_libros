const express = require('express');
const router = express.Router();
const { createAuthentication, getAllAuthentications, getAuthenticationById, updateAuthentication, deleteAuthentication } = require('../controllers/authenControllers');

router.post('/auth/', createAuthentication);
router.post('/auth', getAllAuthentications);
router.post('/auth/:id', getAuthenticationById);
router.post('/auth/:id', updateAuthentication);
router.post('auth/:id', deleteAuthentication);

module.exports = router;
