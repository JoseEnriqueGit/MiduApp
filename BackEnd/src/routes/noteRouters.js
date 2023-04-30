import { Router } from "express";
import {
	runServer,
	getAllNotes,
	getNote,
	newNote,
	modicNote,
	deleteNote

} from "../controllers/noteController.js";

const router = Router();

router.get("/", runServer);

router.get("/all-notes", getAllNotes);

router.get("/note/:id", getNote);

router.post("/new-note", newNote);

router.put("/modic-note/:id", modicNote);

router.delete("/delete-note/:id", deleteNote);

export default router;
