import { Listy } from "antd";
import { useEffect, useState } from "react";

function TaskList() {
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
  }, []);

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
          </div>
        )}
      />
    </div>
  );
}

export default TaskList;
