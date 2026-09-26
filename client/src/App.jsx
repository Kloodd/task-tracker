import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import TasksPage from "./components/TasksPage";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleToggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <Navbar darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />

        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/tasks" element={<TasksPage />} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
