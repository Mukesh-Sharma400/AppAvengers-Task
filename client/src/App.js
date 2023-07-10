import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import PostDetails from "./pages/PostDetails";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("Profile"));
    setUser(storedUser);
  }, []);

  const authRedirect = () => {
    return !user ? <LogIn /> : <Navigate to="/posts" replace />;
  };

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts/*" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/login" element={authRedirect()} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
