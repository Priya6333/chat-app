import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Components/pages/auth/Login.jsx";
import Register from "./Components/pages/auth/Register.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={<h1>Welcome to ChatApp</h1>}
        />

        <Route
          path="*"
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;