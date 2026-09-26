import { Switch, Typography } from "antd";

function Navbar({ darkMode, onToggleDarkMode }) {
  return (
    <nav className="navbar">
      <Typography.Title level={3} className="navbar-title">
        Task Tracker
      </Typography.Title>

      <Switch
        checked={darkMode}
        onChange={onToggleDarkMode}
        checkedChildren="🌙"
        unCheckedChildren="☀️"
      />
    </nav>
  );
}

export default Navbar;