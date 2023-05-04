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
server.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 4000;

async function runServer() {
  await server.listen(PORT);
  console.log(`Running in port ${PORT}`);
}

export default runServer;
