import s from "./AddingTask.module.css";
import React from "react";

const AddingTask = ({ addTask }) => {
  const handleAddTask = () => {
    addTask();
  };

  return (
    <span>
      <button className={`${s.button} ${s.addButton}`} onClick={handleAddTask}>
        Добавить задачу
      </button>
    </span>
  );
};

export default AddingTask;
