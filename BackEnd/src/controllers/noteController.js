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
    console.error(`Error al crear el registro: ${error.message}`);
    if (error instanceof mongoose.Error.ValidationError) {
      const errorMessage = 'Error de validación al crear el registro';
      return res
        .status(400)
        .json({ message: errorMessage, errors: error.errors });
    }
    const errorMessage = 'Error al crear el registro';
    res.status(500).json({ message: errorMessage, error: error.message });
  }
};

const updateNote = async (id, data) => {
  try {
    const existNote = await Notes.findById(id);
    if (!existNote) {
      return { success: false, error: 'Nota no encotrada' };
    }
    await Notes.updateOne({ _id: id }, data, { upsert: true });
    return { success: true, note: existNote };
  } catch (error) {
    console.error(`Error al modificar la nota: ${error.message}`);
    return { success: false, error: error.message };
  }
};

export const modifyNote = async (req, res) => {
  const { id } = req.params;
  const result = await updateNote(id, req.body);
  if (result.success) {
    const successMessage = 'Nota actualizado exitosamente';
    res.status(200).json({ message: successMessage, note: result.note });
  } else {
    const errorMessage = 'Error al actualizar la nota';
    res.status(500).json({ message: errorMessage, error: result.error });
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