import { Button, Form, Input, Typography } from "antd";
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Typography.Title level={2} className="auth-title">
          Register
        </Typography.Title>

        <Form
          layout="vertical"
          onFinish={handleRegister}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter a username",
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
                message: "Please enter a password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <div className="auth-button">
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </div>

          <div className="auth-link">
            <Typography.Text>
              Already have an account?
            </Typography.Text>

            <Button
              type="link"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;