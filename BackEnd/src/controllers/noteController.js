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

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find().lean();

    if (notes.length === 0) {
      const notFoundMessage = 'No se han encontrado registros';
      return res.status(404).json({ message: notFoundMessage });
    }
    const successMessage = 'Registros obtenidos exitosamente';
    res.status(200).json({ message: successMessage, notes });
  } catch (error) {
    console.error(error);
    const errorMessage = `Error al obtener los registros: ${error.message}`;
    res.status(500).json({ message: errorMessage });
  }
};

export const getNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Notes.findById(id).orFail().lean();
    const successMessage = 'Registro obtenido exitosamente';
    res.status(200).json({ message: successMessage, note });
  } catch (error) {
    console.error(`Error al obtener el registro ${id}: ${error.message}`);
    if (error.name === 'DocumentNotFoundError') {
      const notFoundMessage = `El id ${id} no ha sido encontrado`;
      return res.status(404).json({ message: notFoundMessage });
    }
    const errorMessage = 'Error al obtener el registro';
    res.status(500).json({ message: errorMessage, error: error.message });
  }
};

export const newNote = async (req, res) => {
  try {
    const note = await Notes.create(req.body);
    const successMessage = 'Registro creado exitosamente';
    res.status(201).json({ message: successMessage, note });
  } catch (error) {
    const errorMessage = 'Error al crear el registro';
    res.status(500).json({ message: errorMessage, error: error.message });
  }
};

export const modifyNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.updateOne({ _id: id }, req.body, { upsert: true });
    const successMessage = 'Registro actualizado exitosamente';
    res.status(200).json({ message: successMessage, note });
  } catch (error) {
    const errorMessage = 'Error al actualizar el registro';
    res.status(500).json({ message: errorMessage, error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Notes.deleteOne({ _id: id });
    const successMessage = 'Registro eliminado exitosamente';
    res.status(200).json({ message: successMessage, note });
  } catch (error) {
    const errorMessage = 'Error al eliminar el registro';
    res.status(500).json({ message: errorMessage, error: error.message });
  }
};
