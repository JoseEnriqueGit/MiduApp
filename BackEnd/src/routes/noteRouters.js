import { Router } from 'express';
import {
  serverStatus,
  getAllNotes,
  getNote,
  newNote,
  modifyNote,
  deleteNote,
} from '../controllers/noteController.js';

const router = Router();

router.get('/', serverStatus);

router.get('/all-notes', getAllNotes);

router.get('/note/:id', getNote);

router.post('/new-note', newNote);

router.put('/modic-note/:id', modifyNote);

router.delete('/delete-note/:id', deleteNote);

export default router;
