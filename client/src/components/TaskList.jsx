import { Button,Listy } from "antd";
import { useEffect, useState } from "react";

function TaskList({ refreshTrigger, onEditTask }) {
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

            <Button
              type="default"
              onClick={() => onEditTask(task)}
            >
              Edit
            </Button>
          </div>
        )}
      />
    </div>
  );
}

export default TaskList;
