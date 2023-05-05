import mongoose from 'mongoose';


export const errorHandler = (err, req, res, next) => {
  console.error(err);
  switch (err.name) {
    case 'DocumentNotFoundError':
      const notFoundMessage = 'El registro no ha sido encontrado';
      return res.status(404).json({ message: notFoundMessage });
    case 'ValidationError':
      const errorMessage = 'Error de validación al crear el registro';
      return res.status(400).json({ message: errorMessage, errors: err.errors });
    default:
      return res.status(500).json({ message: 'Ha ocurrido un error en el servidor' });
  }
};