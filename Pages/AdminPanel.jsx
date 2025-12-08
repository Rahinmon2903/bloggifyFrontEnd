import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AdminPanel = () => {
    const navigate = useNavigate();
    const[post,setPost]=useState([]);
      const [error, setError] = useState(null);

  useEffect(() => {
    fetchunApprovedPosts();
  }, []);

  const fetchunApprovedPosts = async () => {
    try {
      const response = await api.get("/post/allunapproved");
      setPost(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const approveBlog = async (id) => {
    try {
     const response = await api.patch(`/post/approve/${id}`);
      setPost(post.filter((post) => post._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  const rejectBlog = async (id) => {
    try {
      const response = await api.delete(`/post/delete/${id}`);
      setPost(post.filter((post) => post._id !== id));
      toast.success(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };


    return (
        <>
        {post.map((item) => (
  <div
    key={item._id}
    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
  >
    {/* Image */}
    {item.image && (
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
    )}

    {/* Content */}
    <div className="p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {item.title}
      </h3>

      <p className="text-gray-700 text-sm line-clamp-3 mb-4">
        {item.description}
      </p>

      {/* ✅ Action Buttons (UI Only, No Logic) */}
      <div className="flex gap-3">
        <button
        onClick={(e)=>approveBlog(item._id)}
          className="flex-1 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          Approve
        </button>

        <button
        
        onClick={(e)=>rejectBlog(item._id)}
          className="flex-1 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          Decline
        </button>
      </div>
    </div>
  </div>
))}

        </>
      
    );
};

export default AdminPanel;