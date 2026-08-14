import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Notifications from "../pages/Notifications";
import Settings from "../pages/Settings";
import Explore from "../pages/Explore";
import Search from "../pages/Search";
import CreatePost from "../pages/CreatePost";
import Profile from "../pages/Profile";
import EditProfile from "../pages/EditProfile";
import FollowersFollowing from "../pages/FollowersFollowing";
import Chat from "../pages/Chat";
import ChatWindow from "../chat/ChatWindow";
import ForgotPassword from "../pages/auth/ForgotPassword";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/search" element={<Search />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route
  path="/profile/:id/followers"
  element={<FollowersFollowing />}
/>

<Route
  path="/profile/:id/following"
  element={<FollowersFollowing />}
/>
<Route path="/chat" element={<Chat />} />
<Route path="/chat/:username" element={<ChatWindow />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default AppRoutes;