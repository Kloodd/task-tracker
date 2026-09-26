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
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values)
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
        <div>
            <Typography.Title level={2}>
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
                            message: "Please enter a username"
                        }
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
                            message: "Please enter a password"
                        },
                        {
                            min: 6,
                            message: "Password must be at least 6 characters"
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default Register;