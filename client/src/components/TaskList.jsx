import {
  Button,
  Listy,
  Popconfirm,
  Spin,
  Tag,
  Typography,
  message,
} from "antd";
import { useEffect, useState } from "react";

function TaskList({ refreshTrigger, onEditTask, onTaskDeleted }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setTasks(data);
      } catch (error) {
        console.error("Fetch tasks error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [refreshTrigger]);

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/tasks/${taskId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        message.success("Task deleted successfully!");
        onTaskDeleted();
      } else {
        message.error(data.message || "Failed to delete task");
      }
    } catch (error) {
      console.error("Delete task error:", error);
    }
  };
  return (
    <div>
      <Typography.Title level={2} className="task-list-title">
        Task List
      </Typography.Title>
      {loading ? (
        <div className="task-loading">
          <Spin />
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-task-state">
          <Typography.Title level={4}>No tasks yet</Typography.Title>

          <Typography.Text type="secondary">
            Create your first task using the form.
          </Typography.Text>
        </div>
      ) : (
        <Listy
          items={tasks}
          rowKey="Id"
          itemRender={(task) => (
            <div className="task-item">
              <div className="task-item-header">
                <strong>{task.Title}</strong>

                <Tag
                  color={
                    task.Status === "Completed"
                      ? "green"
                      : task.Status === "In Progress"
                        ? "blue"
                        : "default"
                  }
                >
                  {task.Status}
                </Tag>
              </div>

              {task.Description && (
                <div className="task-description">{task.Description}</div>
              )}

              <div className="task-due-date">
                Due Date:{" "}
                {task.DueDate
                  ? new Date(task.DueDate).toLocaleDateString()
                  : "No due date"}
              </div>

              {task.DueDate &&
                new Date(task.DueDate).setHours(0, 0, 0, 0) <
                  new Date().setHours(0, 0, 0, 0) &&
                task.Status !== "Completed" && (
                  <div className="task-overdue">
                    <Tag color="red">Overdue</Tag>
                  </div>
                )}

              <div className="task-actions">
                <Button type="default" onClick={() => onEditTask(task)}>
                  Edit
                </Button>

                <Popconfirm
                  title="Delete this task?"
                  description="Are you sure you want to delete this task?"
                  onConfirm={() => handleDelete(task.Id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
}

export default TaskList;
