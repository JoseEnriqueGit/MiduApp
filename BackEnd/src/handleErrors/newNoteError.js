export const newNoteError = (err, req, res, next) => {
  console.error(`Error al crear el registro: ${err.message}`);
  if (err instanceof mongoose.Error.ValidationError) {
    const errorMessage = 'Error de validación al crear el registro';
    return res.status(400).json({ message: errorMessage, errors: err.errors });
  }
  const errorMessage = 'Error al crear el registro';
  res.status(500).json({ message: errorMessage, error: err.message });
};
