const Exchange = require('../models/exchangeModels');

exports.createExchange = async (req, res) => {
  try {
    const newExchange = new Exchange(req.body);
    const exchange = await newExchange.save();
    res.status(201).json(exchange);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find().populate('requester').populate('owner').populate('book');
    res.status(200).json(exchanges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findById(req.params.id).populate('requester').populate('owner').populate('book');
    if (!exchange) return res.status(404).json({ error: 'Exchange not found' });
    res.status(200).json(exchange);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exchange) return res.status(404).json({ error: 'Exchange not found' });
    res.status(200).json(exchange);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findByIdAndDelete(req.params.id);
    if (!exchange) return res.status(404).json({ error: 'Exchange not found' });
    res.status(200).json({ message: 'Exchange deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
