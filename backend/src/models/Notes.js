import mongoose from "mongoose";

const NoteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isFavorite: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Note = mongoose.model("Note", NoteSchema);

export default Note;
