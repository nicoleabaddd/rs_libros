const Autentificacion = require('../models/authenticationModels');
const User = require('../models/userModel');

exports.createAuthentication = async (req, res) => {
  try {
    const { correo, contrasenia, usuarioId } = req.body;

    // Verifica que el usuario exista
    const usuarioExistente = await User.findById(usuarioId);
    if (!usuarioExistente) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const nuevaAutentificacion = new Autentificacion({
      correo,
      contrasenia,
      usuario: usuarioId,
    });

    const autentificacion = await nuevaAutentificacion.save();
    res.status(201).json({ message: 'Autenticación creada exitosamente', autentificacion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAuthentications = async (req, res) => {
  try {
    const autentificaciones = await Autentificacion.find().populate('usuario');
    res.status(200).json(autentificaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAuthenticationById = async (req, res) => {
  try {
    const autentificacion = await Autentificacion.findById(req.params.id).populate('usuario');
    if (!autentificacion) return res.status(404).json({ error: 'Autenticación no encontrada' });
    res.status(200).json(autentificacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAuthentication = async (req, res) => {
  try {
    const autentificacion = await Autentificacion.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('usuario');
    if (!autentificacion) return res.status(404).json({ error: 'Autenticación no encontrada' });
    res.status(200).json({ message: 'Autenticación actualizada exitosamente', autentificacion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAuthentication = async (req, res) => {
  try {
    const autentificacion = await Autentificacion.findByIdAndDelete(req.params.id);
    if (!autentificacion) return res.status(404).json({ error: 'Autenticación no encontrada' });
    res.status(200).json({ message: 'Autenticación eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message});
}
};