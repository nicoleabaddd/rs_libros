const Book = require('../models/bookModels');

exports.createBook = async (req, res) => {
  try {
    const { title, author, isbn, description, owner, available, status, category, publicationDate } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    if (!title || !owner || !status || !publicationDate) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben estar presentes.' });
    }

    const createBook = new Book({
      title, 
      author, 
      isbn, 
      description, 
      owner,
      available,
      status,
      category,
      publicationDate,
      imageUrl,
    });

    const book = await createBook.save();
    res.status(201).json({ message: 'Book created successfully', book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('owner');
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('owner');
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, isbn, description, owner, available, status, category, publicationDate } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const updateData = {
      title, 
      author, 
      isbn, 
      description, 
      owner,
      available,
      status,
      category,
      publicationDate,
      imageUrl,
    };

    // Elimina campos con valores undefined para no sobrescribir con undefined
    Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

    const book = await Book.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
