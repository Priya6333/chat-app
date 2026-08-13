import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import MobileNav from "../layout/MobileNav";
import StoryBar from "../feed/StoryBar";
import PostCard from "../feed/PostCard";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/navbar" element={<Navbar />} />
      <Route path="/sidebar" elemment={<Sidebar />} />
      <Route path="/mobilenav" element={<MobileNav />} />
      <Route path="/storybar" element={<StoryBar />} />
      <Route path="/postcard" element={<PostCard />} />
    </Routes>
  );
}

export default AppRoutes;