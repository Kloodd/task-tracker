import { useState } from "react";

import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

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

  const handleTaskDeleted = () => {
    setRefreshTrigger((value) => value + 1);
    setEditTask(null);
  };

  return (
    <div>
      <TaskForm
        onTaskCreated={handleTaskCreated}
        editTask={editTask}
        onTaskUpdated={handleTaskUpdated}
      />

      <TaskList
        refreshTrigger={refreshTrigger}
        onEditTask={setEditTask}
        onTaskDeleted={handleTaskDeleted}
      />
    </div>
  );
}

export default TasksPage;
