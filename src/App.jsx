import React from 'react';
import { ToastContainer } from 'react-toastify';
import NavBar from '../Components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blog from '../Pages/Blog';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import ForgetPassword from '../Pages/ForgetPassword';
import NotFound from '../Pages/NotFound';
import ResetPassword from '../Pages/ResetPassword';
import CreateBlog from '../Pages/CreateBlog';
import AdminPanel from '../Pages/AdminPanel';
import ProtectedRoute from  "../Components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <NavBar/>

      <Routes>
        <Route path='/' element={<Blog/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/forgot-password' element={<ForgetPassword/>} />
        <Route path='/reset-password/:id/:token' element={<ResetPassword/>} />
        <Route path='/create' element={<ProtectedRoute><CreateBlog/></ProtectedRoute>} />
        <Route path='/admin' element={<ProtectedRoute adminOnly><AdminPanel/></ProtectedRoute>} />
        <Route path='*' element={<NotFound/>} />
      </Routes>

    </BrowserRouter>
  );
};

export default App;
