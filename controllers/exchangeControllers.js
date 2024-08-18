const Exchange = require('../models/exchangeModels');
const User = require('../models/userModel');
const Book = require('../models/bookModels');

exports.createExchange = async (req, res) => {
  try {
    const { title, owner, loanDate, returnDate } = req.body;

    // Buscar el ID del usuario solicitante (de req.user)
    const requesterUser = req.user; // Utiliza el usuario autenticado en lugar de buscarlo en la base de datos

    if (!requesterUser) return res.status(404).json({ error: 'Requester not found' });

    // Buscar el ID del usuario dueño del libro
    const ownerUser = await User.findOne({ username: owner });
    if (!ownerUser) return res.status(404).json({ error: 'Owner not found' });

    // Buscar el ID del libro
    const book = await Book.findOne({ title: title });
    if (!book) return res.status(404).json({ error: 'Book not found' });

    // Crear el nuevo intercambio
    const newExchange = new Exchange({
      title,
      owner: ownerUser._id,
      requester: requesterUser._id, // Usa el ID del usuario logueado
      book: book._id,
      loanDate,
      returnDate,
      status: 'pending'
    });

    const exchange = await newExchange.save();
    res.status(201).json(exchange);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  console.log('Usuario en req.user:', req.user); // Verifica si el usuario está en req.user

  try {
    const user = await User.findById(req.user.id); 
    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('Usuario encontrado:', user);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error al obtener el perfil del usuario:', err);
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los intercambios
exports.getAllExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find()
      .populate('requester')
      .populate('owner')
      .populate('book');
    res.status(200).json(exchanges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un intercambio por ID
exports.getExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findById(req.params.id)
      .populate('requester')
      .populate('owner')
      .populate('book');
    if (!exchange) return res.status(404).json({ error: 'Exchange not found' });
    res.status(200).json(exchange);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un intercambio por ID
exports.updateExchange = async (req, res) => {
  try {
    const { requester, owner, book } = req.body;

    // Validar que todos los campos necesarios están presentes
    if (!requester || !owner || !book) {
      return res.status(400).json({ error: 'Requester, owner, and book fields are required.' });
    }

    const exchange = await Exchange.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!exchange) return res.status(404).json({ error: 'Exchange not found' });
    res.status(200).json(exchange);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un intercambio por ID
exports.deleteExchange = async (req, res) => {
  try {
    const exchange = await Exchange.findByIdAndDelete(req.params.id);
    if (!exchange) return res.status(404).json({ error: 'Exchange not found' });
    res.status(200).json({ message: 'Exchange deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};