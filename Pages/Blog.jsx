import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../Services/api.js";

const Blog = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const response = await api.get("/post/all");

      // ✅ backend sends ARRAY directly in data
      const postsFromApi = response?.data?.data;

      setPost(Array.isArray(postsFromApi) ? postsFromApi : []);
      setError(null);

    } catch (err) {
      console.error("FETCH BLOG ERROR:", err);
      setPost([]);
      setError(err?.response?.data?.message || "Failed to fetch blogs");
      toast.error(err?.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          All Blogs
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading blogs...</p>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {!loading && post.length === 0 && !error && (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {post.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>

                <div
                  className="text-gray-700 text-sm line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;
