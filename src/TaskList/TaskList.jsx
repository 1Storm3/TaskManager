import React from "react";
import Task from "../Task/Task";

const TaskList = ({ tasks, selectedTasks, toggleTask }) => (
  <div>
    {tasks &&
      tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          isSelected={selectedTasks.includes(task)}
          toggleTask={toggleTask}
        />
      ))}
  </div>
);

export default TaskList;
