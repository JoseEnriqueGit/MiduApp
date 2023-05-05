export const notFoundError = (err, req, res, next) => {
    console.error(err);
    if (err.name === 'DocumentNotFoundError') {
      res.status(404).send('No se encontró el recurso solicitado');
    } else {
      res.status(500).send('Ocurrió un error en el servidor');
    }
  };
  