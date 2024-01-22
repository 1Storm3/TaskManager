import AddingTask from "../AddingTask/AddingTask";
import s from "./Main.module.css";
import React, { useState, useEffect } from "react";
const Main = () => {
  // Получение данных из localStorage при первой загрузке компонента
  const dataTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(dataTasks);
  const [newTaskUser, setNewTaskUser] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  // Сохранение данных в localStorage как только изменяется массив задач
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const generateId = () => {
    return "_" + Math.random().toString(36).substring(2, 9);
  };

  // Функция добавления задачи
  const addTask = () => {
    if (
      newTaskUser &&
      newTaskUser.trim(newTaskUser, setNewTaskUser, setTasks) !== ""
    ) {
      const newTask = { id: generateId(), text: newTaskUser, completed: false };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setNewTaskUser("");
    }
  };
  // Функция удаления задачи
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    setSelectedTask(null);
  };
  // Функция удаления всех задач
  const deleteAllTasks = () => {
    setTasks([]);
    setSelectedTask(null);
  };

  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className={s.content}>
      <div className={s.header}>Менеджер задач</div>
      {tasks.length > 0 && (
        <div className={s.taskList}>Список ваших задач:</div>
      )}
      {tasks.length > 0 && (
        <button className={s.button} onClick={deleteAllTasks}>
          Удалить все задачи
        </button>
      )}

      {tasks &&
        tasks.map((task) => (
          <div className={s.task}>
            <div
              className={`${s.task} ${
                selectedTask === task ? s.selectedTask : ""
              } ${task.completed ? s.completedTask : ""}`}
              key={task.id}
              onClick={() => setSelectedTask(task)}
            >
              <input
                type="checkbox"
                className={s.checkbox}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
            </div>
            <div className={`${s.delete} `} onClick={() => deleteTask(task.id)}>
              Х
            </div>
          </div>
        ))}
      <input
        type="text"
        value={newTaskUser}
        onChange={(e) => setNewTaskUser(e.target.value)}
        className={s.input}
        placeholder="Введите новую задачу"
      />

      <AddingTask addTask={addTask} />
      <div className={s.copyright}>
        Developed by
        <a href="https://t.me/StormEV">STORM</a>
      </div>
    </div>
  );
};

export default Main;
