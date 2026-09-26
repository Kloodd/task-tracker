import { Button, Listy, Popconfirm, Tag } from "antd";
import { useEffect, useState } from "react";

function TaskList({ refreshTrigger, onEditTask, onTaskDeleted }) {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setTasks(data);
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

      console.log(data);

      if (response.ok) {
        onTaskDeleted();
      }
    } catch (error) {
      console.error("Delete task error:", error);
    }
  };
  return (
    <div>
      <h2>My Task</h2>

      <Listy
        items={tasks}
        rowKey="Id"
        itemRender={(task) => (
          <div>
            <strong>{task.Title}</strong>

            <div>{task.Description}</div>

            <div>Status: {task.Status}</div>

            <div>
              Due Date:{" "}
              {task.DueDate
                ? new Date(task.DueDate).toLocaleDateString()
                : "No due date"}
            </div>

            {task.DueDate &&
              new Date(task.DueDate).setHours(0, 0, 0, 0) <
                new Date().setHours(0, 0, 0, 0) &&
              task.Status !== "Completed" && (
                <div>
                  <Tag color="red">Overdue</Tag>
                </div>
              )}

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
        )}
      />
    </div>
  );
}

export default TaskList;
