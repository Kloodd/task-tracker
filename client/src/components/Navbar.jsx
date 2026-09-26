import { Button, Switch, Typography } from "antd";
import { useNavigate } from "react-router";

function Navbar({ darkMode, onToggleDarkMode, isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Typography.Title level={3} className="navbar-title">
        Task Tracker
      </Typography.Title>

      <div className="navbar-actions">
        <Switch
          checked={darkMode}
          onChange={onToggleDarkMode}
          checkedChildren="🌙"
          unCheckedChildren="☀️"
        />

        {isAuthenticated && (
          <Button danger onClick={handleLogout}>
            Logout
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
