const express = require('express');
const router = express.Router();
const { createAuthentication, getAllAuthentications, getAuthenticationById, updateAuthentication, deleteAuthentication } = require('../controllers/authenControllers');

router.post('/createAuth/', createAuthentication);
router.post('/auth', getAllAuthentications);
router.post('/getAuth/:id', getAuthenticationById);
router.post('/updateAuth/:id', updateAuthentication);
router.post('deleteAuth/:id', deleteAuthentication);

module.exports = router;
