import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../Services/api.js';
import ReactQuill from 'react-quill-new';
import "react-quill-new/dist/quill.snow.css";


const CreateBlog = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
   const [error, setError] = useState(null);

   const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!title || !description || !image){
        return setError("All field are required")
    }
    const newdescription=description.replace(/<\/?p>/g,"");
    const formData=new FormData();
    formData.append("title",title);
    formData.append("description",newdescription);
    if(image){
        formData.append("image",image);
    }
    try {
        const response=await api.post("/post/create",formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${localStorage.getItem("token")}`
            },
        }

        );
        toast.success(response.data.message);
        setError(null);
        navigate("/");
       
        
    } catch (error) {
        console.log(error);
        setError(error.response.data.message);
        toast.error(error.response.data.message);
        
    }


   }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Create New Blog
        </h2>

         {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              placeholder="Enter blog title"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description */}
        <ReactQuill
          value={description}
          onChange={setDescription}
          placeholder="Enter blog description"
          className="w-full border rounded-lg px-3 py-2 bg-white"
          theme="snow"
          />

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor='image'>
              Upload Image
            </label>
            <input
            name='image'
            id='image'
              onChange={(e) => setImage(e.target.files[0])}
              
              type="file"
              accept='image/*'
              className="w-full border rounded-lg px-3 py-2 bg-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow hover:opacity-90 transition"
            >
              Create Blog
            </button>

           
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
