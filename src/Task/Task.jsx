import React from "react";
import s from "./Task.module.css";

const Task = ({ task, isSelected, toggleTask }) => {
  const handleTaskClick = (e) => {
    // Предотвращаем всплытие события от чекбокса до родительского элемента
    e.stopPropagation();
    toggleTask(task);
  };
  return (
    <div
      className={`${s.task} ${isSelected ? s.selectedTask : ""} ${
        task.completed ? s.completedTask : ""
      }`}
      onClick={handleTaskClick}
    >
      <span>{task.text}</span>

      <input
        type="checkbox"
        className={s.checkbox}
        checked={task.completed}
        onChange={() => toggleTask(task)}
      />
    </div>
  );
};

export default Task;
