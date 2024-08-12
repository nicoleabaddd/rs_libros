const express = require('express');
const router = express.Router();
const messagesControllers = require('../controllers/messagesControllers')

router.post('/messages/', messagesControllers.createMessage);
router.post('/messages', messagesControllers.getAllMessages);
router.post('/messages/:id', messagesControllers.updateMessage);
router.post('/messages/:id', messagesControllers.deleteMessage);
router.post('/messages/:id', messagesControllers.getMessage);

module.exports=router;
