import { Button, DatePicker, Form, Input, Select } from "antd";

function TaskForm({ onTaskCreated }) {
  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...values,
        DueDate: values.DueDate ? values.DueDate.format("YYYY-MM-DD") : null,
      };

      const response = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        onTaskCreated();
      }
    } catch (error) {
      console.error("Create task error:", error);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>

      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Title"
          name="Title"
          rules={[
            {
              required: true,
              message: "Please enter a task title",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="Description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Status" name="Status" initialValue="Pending">
          <Select
            options={[
              {
                value: "Pending",
                label: "Pending",
              },
              {
                value: "In Progress",
                label: "In Progress",
              },
              {
                value: "Completed",
                label: "Completed",
              },
            ]}
          />
        </Form.Item>

        <Form.Item label="Due Date" name="DueDate">
          <DatePicker />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create Task
        </Button>
      </Form>
    </div>
  );
}

export default TaskForm;
