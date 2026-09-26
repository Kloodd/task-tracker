import { Button, Form, Input, Typography, message } from "antd";
import { useNavigate } from "react-router";

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const handleLogin = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);

        message.success("Login successful!");

        navigate("/tasks");
      } else {
        message.error(data.message || "Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-card">
        <Typography.Title level={2} className="auth-title">
          Login
        </Typography.Title>

        <Form layout="vertical" onFinish={handleLogin}>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="auth-button">
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </div>

          <div className="auth-link">
            <Typography.Text>Don't have an account?</Typography.Text>

            <Button type="link" onClick={() => navigate("/register")}>
              Register
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
