import { useState } from "react";
import { Typography } from "antd";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import TaskReport from "./TaskReport";

function TasksPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const [editTask, setEditTask] = useState(null);

  const handleTaskCreated = () => {
    setRefreshTrigger((value) => value + 1);
  };

  const handleTaskUpdated = () => {
    setRefreshTrigger((value) => value + 1);
    setEditTask(null);
  };

  const handleCancelEdit = () => {
    setEditTask(null);
  };

  const handleTaskDeleted = () => {
    setRefreshTrigger((value) => value + 1);
    setEditTask(null);
  };

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        <Typography.Title level={1} className="tasks-title">
          My Tasks
        </Typography.Title>

        <TaskReport refreshTrigger={refreshTrigger}/>

        <div className="tasks-content">
          <div className="task-form-card">
            <TaskForm
              onTaskCreated={handleTaskCreated}
              editTask={editTask}
              onTaskUpdated={handleTaskUpdated}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          <div className="task-list-card">
            <TaskList
              refreshTrigger={refreshTrigger}
              onEditTask={setEditTask}
              onTaskDeleted={handleTaskDeleted}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksPage;
