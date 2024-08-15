const Autentificacion = require('../models/authenticationModels');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.createAuthentication = async (req, res) => {
  try {
    const { correo, contrasenia, usuarioId } = req.body;

    // Verifica que todos los campos requeridos estén presentes
    if (!correo || !contrasenia || !usuarioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verifica que el usuario exista
    const usuarioExistente = await User.findById(usuarioId);
    if (!usuarioExistente) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    // Crea la nueva autenticación
    const nuevaAutentificacion = new Autentificacion({
      correo,
      contrasenia: hashedPassword,
      usuario: usuarioId,
    });

    // Guarda la autenticación en la base de datos
    const autentificacion = await nuevaAutentificacion.save();

    // Responde con el objeto creado
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
    // Si se proporciona una nueva contraseña, cifrarla antes de la actualización
    if (req.body.contrasenia) {
      req.body.contrasenia = await bcrypt.hash(req.body.contrasenia, 10);
    }

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
