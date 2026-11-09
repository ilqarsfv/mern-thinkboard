import axios from "axios";
import { ArrowLeft, Save, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNote = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5001/api/notes/${id}`);
        console.log(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        console.log(error);
        setError("Note could not be found");
      } finally {
        setLoading(false);
      }
    };

    getNote();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      axios.put(`http://localhost:5001/api/notes/${id}`, {
        title: title.trim(),
        content: content.trim(),
      });
    } catch (error) {
      console.log(error);
      setError("Note could not be found");
    } finally {
      setLoading(false);
      navigate("/");
    }

    if (error && !title) {
      return <p className="text-red-600">{error}</p>;
    }
  };

  const deleteNote = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/notes/${id}`);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Note could not be deleted");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavLink to={"/"} className="inline-flex items-center gap-2">
        <ArrowLeft />
        Back to notes
      </NavLink>
      <h1 className="mt-12 font-bold text-5xl">Edit detail note</h1>
      <p className="mt-4 opacity-70">Update your throughts and keep your ideas current </p>

      <>
        {error ? <div className="text-[red] mt-4">{error}</div> : (
          <form action="" onSubmit={handleUpdate}>
            <div className="bg-white p-12 rounded-[12px] border border-[#0002] mt-12">
              <fieldset className="fieldset">
                <legend className="fieldset-legend text-[16px] font-bold">Title</legend>
                <input
                  onChange={(event) => setTitle(event.target.value)}
                  type="text"
                  className="input outline-none w-full rounded-[8px] transition-all ease-in-out duration-300"
                  placeholder="Give your note a title"
                  value={title}
                  required
                />
              </fieldset>
              <fieldset className="fieldset mt-4">
                <legend className="fieldset-legend text-[16px] font-bold">Content</legend>
                <textarea
                  onChange={(event) => setContent(event.target.value)}
                  className="textarea h-64 outline-none transition-all ease-in-out duration-300 w-full rounded-[8px]"
                  placeholder="Start writing your note"
                  value={content}
                  required
                ></textarea>
                <p className="text-right text-sm opacity-60">{content.length} / 2000</p>
              </fieldset>

              <div className="flex justify-between items-center mt-6">
                <button onClick={deleteNote} className="text-[red] flex gap-2 cursor-pointer">
                  <Trash /> Delete note
                </button>
                <div className="flex justify-end items-center gap-6">
                  <NavLink to={"/"}>Cancel</NavLink>
                  <button type="submit" disabled={loading} className="btn bg-[#A05E2D] text-white rounded-[8px] font-[400]">
                    <Save /> {loading ? "Saving..." : "Save Note"}
                  </button>
                </div>
              </div>

              {error && <p className="mt-4 text-red-600">{error}</p>}
            </div>
          </form>
        )}
      </>
    </div>
  );
};

export default NoteDetailPage;
