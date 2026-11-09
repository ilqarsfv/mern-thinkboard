import axios from "axios";
import NoteFilters from "../components/NoteFilters";
import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Navbar from "../components/Navbar";
import { NOTE_COLORS, NOTE_BADGE_COLORS } from "../constants/noteStyles";
const HomePage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [allNotes, setAllNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/notes");
        const notes = await response.data;
        const sortedNotes = [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAllNotes(sortedNotes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);

      setAllNotes((currentNotes) => currentNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Note can not deleted:", error);
    }
  };

  const handleToggleFavorite = async (id) => {
    try {
      const { data: updatedNote } = await axios.patch(`http://localhost:5001/api/notes/${id}/favorite`);
      setAllNotes((currentNotes) => currentNotes.map((note) => (note._id === id ? updatedNote : note)));
    } catch (error) {
      console.error("Favorite can not updated:", error);
    }
  };

  const renderNotes = (notes) => (
    <div className="mt-8 flex flex-wrap gap-4">
      {notes.map((note, index) => (
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
  );

  const favoritedNotes = allNotes.filter((note) => note.isFavorite);

  const recentNotes = allNotes.slice(0, 5);

  const notesByFilter = activeFilter === "recent" ? recentNotes : activeFilter === "favorites" ? favoritedNotes : allNotes;

  const searchedNotes = notesByFilter.filter((note) => note.title?.toLowerCase().includes(searchTerm.trim().toLocaleLowerCase()));

  return (
    <>
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <NoteFilters notesLength={allNotes.length} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      {searchedNotes.length > 0 ? renderNotes(searchedNotes) : <div className="mt-8 text-[red] text-2xl font-bold">No favorite notes found</div>}
    </>
  );
};

export default HomePage;
