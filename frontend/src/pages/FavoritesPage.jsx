import axios from "axios";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import { NOTE_COLORS, NOTE_BADGE_COLORS } from "../constants/noteStyles.js";
const FavoritesPage = () => {
  const [allFavoritesNotes, setAllFavoritedNotes] = useState([]);
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        const notes = await res.data;
        const sortedNotes = [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const sortedFavorite = sortedNotes.filter((note) => note.isFavorite);
        setAllFavoritedNotes(sortedFavorite);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotes();
  }, []);

  const handleToggleFavorite = async (id) => {
    try {
      const { data: updatedNote } = await axios.patch(`http://localhost:5001/api/notes/${id}/favorite`);
      setAllFavoritedNotes((currentNotes) => currentNotes.map((note) => (note._id === id ? updatedNote : note)));
    } catch (error) {
      console.error("Favorite can not updated:", error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);

      setAllFavoritedNotes((currentNotes) => currentNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Note can not deleted:", error);
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold">Favorites</h1>
      {allFavoritesNotes.length > 0 ? (
        <div className="mt-8 flex flex-wrap gap-4">
          {allFavoritesNotes.map((note, index) => (
            <div key={index}>
              <NoteCard
                badgeColor={NOTE_BADGE_COLORS[index % NOTE_BADGE_COLORS.length]}
                color={NOTE_COLORS[index % NOTE_COLORS.length]}
                id={note._id}
                title={note.title}
                content={note.content}
                created={note.createdAt}
                onDelete={handleDeleteNote}
                isFavorite={note.isFavorite}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 font-bold text-2xl text-[red]">No favorites Note found.</div>
      )}
    </div>
  );
};

export default FavoritesPage;
