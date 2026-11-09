import axios from "axios";
import { ArrowLeft, Save } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const CreatePage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post("http://localhost:5001/api/notes", {
        title: title.trim(),
        content: content.trim(),
      });

      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Note could not be created.");
    } finally {
      setLoading(true);
    }
  };

  return (
    <div>
      <NavLink to={"/"} className="inline-flex items-center gap-2">
        <ArrowLeft />
        Back to notes
      </NavLink>
      <h1 className="mt-12 font-bold text-5xl">Create a new note</h1>
      <p className="mt-4 opacity-70">Capture your throughts before they slip away</p>

      <form action="" onSubmit={handleSubmit}>
        <div className="bg-white p-12 rounded-[12px] border border-[#0002] mt-12">
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-[16px] font-bold">Title</legend>
            <input onChange={(event) => setTitle(event.target.value)} type="text" className="input outline-none w-full rounded-[8px] transition-all ease-in-out duration-300" placeholder="Give your note a title" />
          </fieldset>
          <fieldset className="fieldset mt-4">
            <legend className="fieldset-legend text-[16px] font-bold">Content</legend>
            <textarea onChange={(event) => setContent(event.target.value)} className="textarea h-64 outline-none transition-all ease-in-out duration-300 w-full rounded-[8px]" placeholder="Start writing your note"></textarea>
            <p className="text-right text-sm opacity-60">{content.length} / 2000</p>
          </fieldset>

          <div className="flex justify-end items-center mt-6 gap-6">
            <NavLink to={"/"}>Cancel</NavLink>
            <button type="submit" disabled={loading} className="btn bg-[#A05E2D] text-white rounded-[8px] font-[400]">
              <Save /> {loading ? "Saving..." : "Save Note"}
            </button>
          </div>

          {error && <p className="mt-4 text-red-600">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
