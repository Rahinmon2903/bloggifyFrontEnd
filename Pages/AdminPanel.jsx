import React, { useEffect, useState } from "react";
import api from "../Services/api";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUnApprovedPosts();
  }, []);

  const fetchUnApprovedPosts = async () => {
    try {
      const response = await api.get("/post/allunapproved");
      setPost(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch unapproved posts");
    }
  };

  const approveBlog = async (id) => {
    try {
      const response = await api.patch(`/post/approve/${id}`);
      setPost((prev) => prev.filter((post) => post._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      const msg = error?.response?.data?.message || "Approval failed";
      setError(msg);
      toast.error(msg);
    }
  };

  const rejectBlog = async (id) => {
    try {
      const response = await api.delete(`/post/delete/${id}`);
      setPost((prev) => prev.filter((post) => post._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      const msg = error?.response?.data?.message || "Delete failed";
      setError(msg);
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Admin Panel – Pending Blogs
        </h2>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 text-center">
            {error}
          </div>
        )}

        {post.length === 0 && (
          <p className="text-center text-gray-500">
            No pending blogs for approval.
          </p>
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
                  className="text-gray-700 text-sm line-clamp-3 mb-4"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />

                <div className="flex gap-3">
                  <button
                    onClick={() => approveBlog(item._id)}
                    className="flex-1 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => rejectBlog(item._id)}
                    className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;
