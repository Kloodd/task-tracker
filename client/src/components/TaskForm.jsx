import { Button, DatePicker, Form, Input, Select } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

function TaskForm({ onTaskCreated, editTask, onTaskUpdated, onCancelEdit }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editTask) {
      form.setFieldsValue({
        Title: editTask.Title,
        Description: editTask.Description,
        Status: editTask.Status,
        DueDate: editTask.DueDate ? dayjs(editTask.DueDate) : null,
      });
    } else {
      form.resetFields();
    }
  }, [editTask, form]);

  const handleSubmit = async (values) => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        ...values,
        DueDate: values.DueDate ? values.DueDate.format("YYYY-MM-DD") : null,
      };

      const url = editTask
        ? `http://localhost:5000/api/tasks/${editTask.Id}`
        : "http://localhost:5000/api/tasks";

      const method = editTask ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        form.resetFields();
        if (editTask) {
          onTaskUpdated();
        } else {
          onTaskCreated();
        }
      }
    } catch (error) {
      console.error("Create task error:", error);
    }
  };

  return (
    <div>
      <h2>{editTask ? "Edit Task" : "Create Task"}</h2>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
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
          <DatePicker
            disabledDate={(current) => {
              return current && current.isBefore(dayjs(), "day");
            }}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          {editTask ? "Update Task" : "Create Task"}
        </Button>

        {editTask && (
          <Button onClick={onCancelEdit} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        )}
      </Form>
    </div>
  );
}

export default TaskForm;
