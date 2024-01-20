import s from "./Main.module.css";
import React, { useState, useEffect } from "react";

const Main = () => {
  // Получение данных из localStorage при первой загрузке компонента
  const dataTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(dataTasks);
  const [newTaskUser, setNewTaskUser] = useState("");
  const [selectedTask, setSelectedTask] = useState([]);

  // Сохранение данных в localStorage как только изменяется массив задач
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  // Функция добавления задачи
  const addTask = () => {
    if (newTaskUser.trim() !== "") {
      const newTask = { text: newTaskUser, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskUser("");
    }
  };
  // Функция удаления задачи
  const deleteTask = () => {
    if (selectedTask !== null && !selectedTask.completed) {
      setTasks((prevTasks) =>
        prevTasks.filter((task) => task.text !== selectedTask.text)
      );
      setSelectedTask(null);
    }
  };
  const toggleTask = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };
  return (
    <div className={s.content}>
      <div className={s.header}>Менеджер задач</div>
      {tasks.length > 0 && <div className={s.taskList}>Список задач:</div>}

      {tasks &&
        tasks.map((task, indexTask) => (
          <div
            className={`${s.task} ${
              selectedTask === task ? s.selectedTask : ""
            } ${task.completed ? s.completedTask : ""}`}
            key={indexTask}
            onClick={() => setSelectedTask(task)}
          >
            <span>{task.text}</span>
            <input
              type="checkbox"
              className={s.checkbox}
              checked={task.completed}
              onChange={() => toggleTask(indexTask)}
            />
          </div>
        ))}
      <input
        type="text"
        value={newTaskUser}
        onChange={(e) => setNewTaskUser(e.target.value)}
        className={s.input}
        placeholder="Введите новую задачу"
      />
      <button className={`${s.button} ${s.addButton}`} onClick={addTask}>
        Добавить задачу
      </button>

      <button className={`${s.button} ${s.deleteButton}`} onClick={deleteTask}>
        Удалить задачу
      </button>

      <div className={s.copyright}>
        Developed by
        <a href="https://t.me/StormEV">STORM</a>
      </div>
    </div>
  );
};

export default Main;
