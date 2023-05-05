import Notes from '../models/noteModel.js';

export const serverStatus = (req, res) => {
  try {
    return res.json({
      status: 'success',
      message: 'El servidor está funcionando correctamente',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error al obtener el estado del servidor',
      error: error.message,
    });
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const notes = await Notes.find().lean();

    if (notes.length !== 0) {
      const notFoundMessage = 'No se han encontrado registros';
      // return res.status(404).json({ message: notFoundMessage });
    }
    const successMessage = 'Registros obtenidos exitosamente';
    res.status(200).json({ message: successMessage, notes });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Notes.findById(id).orFail().lean();
    const successMessage = 'Registro obtenido exitosamente';
    res.status(200).json({ message: successMessage, note });
  } catch (error) {
    next(error);
  }
};

export const newNote = async (req, res) => {
  try {
    const note = await Notes.create(req.body);
    const successMessage = 'Registro creado exitosamente';
    res.status(201).json({ message: successMessage, note });
  } catch (error) {
    next(error);
  }
};

const updateNote = async (id, data) => {
  const { title, content } = data;
  const updatedNote = await Notes.findByIdAndUpdate(id, { title, content }, { new: true, upsert: true });
  if (!updatedNote) {
    throw new Error('Nota no encontrada');
  }
  return { note: updatedNote };
};

export const modifyNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateNote(id, req.body);
    const successMessage = 'Nota actualizada exitosamente';
    res.status(200).json({ message: successMessage, note: result.note });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const existNote = await Notes.findById(id);
    if (!existNote) {
      return res.status(404).json({ message: 'Nota no encontrada' });
    }

    await Notes.deleteOne({ _id: id });
    const successMessage = 'Nota eliminada exitosamente';
    res.status(200).json({ message: successMessage });
  } catch (error) {
    const errorMessage = 'Error al eliminar la nota';
    res.status(500).json({ message: errorMessage, error: error.message });
  }
};