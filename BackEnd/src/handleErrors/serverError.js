export const serverError = (req, res) => {
    res.status(500).send('Ocurrió un error en el servidor');
  };
  