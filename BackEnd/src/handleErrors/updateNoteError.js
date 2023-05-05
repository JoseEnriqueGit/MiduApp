export const updateNoteError = (err, req, res, next) => {
  console.error(`Error al modificar la nota: ${err.message}`);
  if (err.message === 'Nota no encontrada') {
    return res.status(404).json({ message: err.message });
  }
  const errorMessage = 'Error al actualizar la nota';
  res.status(500).json({ message: errorMessage, error: err.message });
};