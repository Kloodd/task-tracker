import { useState } from "react";

import TaskForm from "./TaskForm";
import TaskList from "./TaskList";

function TasksPage() {
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleTaskCreated = () => {
        setRefreshTrigger((value) => value + 1);
    };

    return (
        <div>
            <TaskForm onTaskCreated={handleTaskCreated} />

            <TaskList refreshTrigger={refreshTrigger} />
        </div>
    );
}

export default TasksPage;