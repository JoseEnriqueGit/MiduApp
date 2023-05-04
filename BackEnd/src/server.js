import cors from 'cors';
import express from 'express';
import Routers from './routes/noteRouters.js';

const server = express();

// middlewares
// server.use(cors(), express.json());
server.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}), express.json());

// Routes
server.use(Routers);

// Error handling
server.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

function errorHandler (err, req, res, next) {
  console.error(err);
  if (err.statusCode === 400) {
    res.status(400).send(`Solicitud incorrecta ${err.message}`);
  } else if (err.statusCode === 404) {
    res.status(404).send('No se encontró el recurso solicitado');
  } else {
    res.status(500).send(`Ocurrió un error en el servidor: ${err.message}`);
  }
}

server.use(errorHandler);

const PORT = process.env.PORT || 4000;

async function runServer() {
  await server.listen(PORT);
  console.log(`Running in port ${PORT}`);
}

export default runServer;
