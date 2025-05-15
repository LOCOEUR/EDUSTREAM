import './App.css';
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import VideoDetailPage from './pages/VideoDetailPage';
import 'bootstrap-icons/font/bootstrap-icons.css';
import SiteNavbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchPage from './pages/SearchPage';
import CategoryPage from './pages/CategoryPage';
import CreateVideo from './pages/CreateVideo';



function App() {
  return (
    <Router>
      <SiteNavbar />
      <Routes>
      <Route path="/search" element={<SearchPage />} />
      <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/video/:id" element={<VideoDetailPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/createvideo" element={<CreateVideo />} /> 
        
      </Routes>
    </Router>
  );
}

export default App;



