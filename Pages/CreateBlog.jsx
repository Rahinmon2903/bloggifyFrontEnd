import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../Services/api.js";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image) {
      return setError("All fields are required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description); // ✅ keep HTML
    formData.append("image", image);

    try {
      setLoading(true);

      const response = await api.post("/post/create", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success(response.data.message);
      setError(null);
      navigate("/", { replace: true });

    } catch (err) {
      console.error("CREATE BLOG ERROR:", err);

      const msg =
        err?.response?.data?.message ||
        "Failed to create blog";

      setError(msg);
      toast.error(msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create New Blog
        </h2>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <ReactQuill
            value={description}
            onChange={setDescription}
            placeholder="Enter blog description"
            theme="snow"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border rounded-lg px-3 py-2 bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
