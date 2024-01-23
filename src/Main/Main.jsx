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

  // генерация id задачи
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
  // Функция отслеживания отмеченных задач
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
        <button className={s.buttonDelete} onClick={deleteAllTasks}>
          Удалить все задачи
        </button>
      )}
      <div className={s.allTasks}>
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
              <div
                className={`${s.delete} `}
                onClick={() => deleteTask(task.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1_15)">
                    <path
                      d="M17.208 0H6.804C2.736 0 0 2.856 0 7.104V16.908C0 21.144 2.736 24 6.804 24H17.208C21.276 24 24 21.144 24 16.908V7.104C24 2.856 21.276 0 17.208 0Z"
                      fill="#0D0D0D"
                    />
                    <path
                      d="M15.6189 14.1246L13.4841 11.991L15.6177 9.8574C16.0281 9.4482 16.0281 8.7822 15.6177 8.373C15.2073 7.9602 14.5437 7.9614 14.1333 8.3718L11.9985 10.5054L9.86367 8.3694C9.45327 7.959 8.78847 7.9614 8.37807 8.3694C7.96887 8.7798 7.96887 9.4458 8.37807 9.855L10.5141 11.991L8.38287 14.121C7.97247 14.5314 7.97247 15.1974 8.38287 15.6054C8.58807 15.8118 8.85567 15.9138 9.12447 15.9138C9.39447 15.9138 9.66207 15.8118 9.86727 15.6066L11.9985 13.4754L14.1345 15.6102C14.3397 15.8154 14.6073 15.9174 14.8761 15.9174C15.1449 15.9174 15.4137 15.8142 15.6189 15.6102C16.0293 15.1998 16.0293 14.535 15.6189 14.1246Z"
                      fill="#C2C2C2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_15">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          ))}
      </div>
      <input
        type="text"
        value={newTaskUser}
        onChange={(e) => {
          setNewTaskUser(e.target.value);
        }}
        className={s.input}
        placeholder="Введите новую задачу"
      />
      <span>
        <button className={s.buttonAdd} onClick={addTask}>
          Добавить задачу
        </button>
      </span>
      <div className={s.copyright}>
        Developed by
        <a href="https://t.me/StormEV">STORM</a>
      </div>
    </div>
  );
};

export default Main;
