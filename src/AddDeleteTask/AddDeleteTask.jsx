import s from "./AddDeleteTask.module.css";
import React from "react";

const AddingTask = ({ addTask, deleteTask }) => {
  const handleAddTaskClick = () => {
    addTask();
  };
  const handleDeleteTaskClick = () => {
    deleteTask();
  };
  return (
    <span>
      <button
        className={`${s.button} ${s.addButton}`}
        onClick={handleAddTaskClick}
      >
        Добавить задачу
      </button>
      <button
        className={`${s.button} ${s.deleteButton}`}
        onClick={handleDeleteTaskClick}
      >
        Удалить задачу
      </button>
    </span>
  );
};

export default AddingTask;
