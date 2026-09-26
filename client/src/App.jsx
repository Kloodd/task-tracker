import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useEffect, useState } from "react";
import { ConfigProvider, theme } from "antd";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import TasksPage from "./components/TasksPage";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
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
        <Navbar
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <Routes>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route path="/register" element={<Register />} />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TasksPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
