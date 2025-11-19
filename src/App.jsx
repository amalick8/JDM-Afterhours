import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import "./styles/styles.css";

export default function App() {
  const [theme, setTheme] = useState("blue");
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.setAttribute("data-mode", mode);
  }, [theme, mode]);

  return (
    <BrowserRouter>

      {/* ALWAYS VISIBLE TOP CONTROLS */}
      <div className="top-controls">
        <select
          className="theme-selector"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
        >
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
        </select>

        <button
          className="mode-toggle"
          onClick={() => setMode(mode === "dark" ? "light" : "dark")}
        >
          {mode === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
}
