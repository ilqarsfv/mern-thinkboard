import { Pen, Star, Trash } from "lucide-react";
import { NavLink } from "react-router";

const NoteCard = ({ badgeColor, color, id, title, content, created, onDelete, isFavorite, onToggleFavorite }) => {
  const formatCreatedDate = (createdAt) => {
    if (!createdAt) return "";

    const date = new Date(createdAt);

    if (Number.isNaN(date.getTime())) {
      return "";
    }

    const today = new Date();

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const time = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    if (isToday) {
      return `Today, ${time}`;
    }

    if (isYesterday) {
      return `Yesterday, ${time}`;
    }

    const isDifferentYear = date.getFullYear() !== today.getFullYear();

    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      ...(isDifferentYear && { year: "numeric" }),
    });

    return `${formattedDate}, ${time}`;
  };

  const handleDeleteClick = async () => {
    const confirm = window.confirm("Are you sure deleted?");
    if (!confirm) return;
    await onDelete(id);
  };

  return (
    <div className={`card text-black w-96 ${color}`}>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">
            <span className={`inline-block w-[25px] h-[25px] rounded-[50%] ${badgeColor}`}></span>
            {title}
          </h2>
          <button onClick={() => onToggleFavorite(id)} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"} type="button" className="cursor-pointer add_favorite_or_remove">
            <Star className={isFavorite ? "fill-yellow-400 text-yellow-400" : ""} />
          </button>
        </div>
        <p>{content}</p>
        <p className="my-4 h-[1px] bg-[#0003]"></p>
        <div className="flex justify-between">
          <div>{formatCreatedDate(created)}</div>
          <div className="card-actions flex gap-4">
            <NavLink to={`/notes/${id}`} className="cursor-pointer">
              <Pen size={22} />
            </NavLink>
            <button onClick={handleDeleteClick} className="cursor-pointer">
              <Trash size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
