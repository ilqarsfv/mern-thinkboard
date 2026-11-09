import express from "express";
import { createNote, deleteNote, getAllNotes, getNoteById, toggleFavorite, updateNote } from "../controller/notesController.js";

const router = express.Router();

router.get('/', getAllNotes);

router.get("/:id", getNoteById);

router.post('/', createNote);

router.put('/:id', updateNote)

router.delete('/:id', deleteNote)

router.patch("/:id/favorite", toggleFavorite);

export default router;