import Note from "../models/Notes.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getNoteById(req, res) {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    } else {
      res.status(200).json(note);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
    });
    console.log("Creating note:", note);
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function updateNote(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updateNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updateNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json(updateNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function deleteNote(req, res) {
  try {
    const { id } = req.params;
    const deleteNote = await Note.findByIdAndUpdate(id);
    if (!deleteNote) {
      return res.status(404).json({ message: "Note not found" });
    } else {
      await Note.findByIdAndDelete(id);
      res.status(200).json({ message: "Note deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function toggleFavorite(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    note.isFavorite = !note.isFavorite;
    const savedNote = await note.save();
    res.status(200).json(savedNote);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
