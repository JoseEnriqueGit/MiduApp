import cors from 'cors';
import express from 'express';
import Routers from './routes/noteRouters.js';
import { routeNotFound } from './handleErrors/routeNotFound.js';
import { serverError } from './handleErrors/serverError.js';
import { notFoundError } from './handleErrors/notFoundError.js';
import { newNoteError } from './handleErrors/newNoteError.js';
import { updateNoteError } from './handleErrors/updateNoteError.js';
import { errorHandler } from './handleErrors/errorHandler.js';


const server = express();

// middlewares
server.use(
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }),
  express.json()
);

// Routes
server.use(Routers);

// Error handling
server.use(routeNotFound, errorHandler);
// server.use(serverError);

// Server
const PORT = process.env.PORT || 4000;

async function runServer() {
  await server.listen(PORT);
  console.log(`Running in port ${PORT}`);
}

export default runServer;
