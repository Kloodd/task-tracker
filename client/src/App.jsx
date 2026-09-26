import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./components/Login";
import Register from "./components/Register";
import TasksPage from "./components/TasksPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;