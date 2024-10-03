import { FC, useState, useEffect, useCallback } from "react";
import { ITodoItem } from "../Interfaces/todos";
import TodoList from "./TodoList";
import NewTodo from "./NewTodo";

const GlobalContainer: FC = () => {
  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<ITodoItem[]>(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos")!)
      : []
  );

  const [lastId, setLastId] = useState<number>(
    todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) : 0
  );

  const setTasks = useCallback(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    setTasks();
  }, [todos, setTasks]);

  const addTodo = (task: string): void => {
    const newTodo = {
      id: lastId + 1,
      task: task,
      done: false,
    };
    setLastId(lastId + 1);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const handleAddTodo = useCallback(
    (e: React.FormEvent): void => {
      e.preventDefault();
      if (task.trim() !== "") {
        addTodo(task);
        setTask("");
      }
    },
    [lastId, task]
  );

  const NewTodoHandleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>): void => {
      setTask(e.target.value);
    },
    [task]
  );

  const deleteTodo = useCallback((id: number): void => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: number): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }, []);

  const editTodo = useCallback((id: number, newTask: string): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      )
    );
  }, []);

  return (
    <>
      <NewTodo
        handleAddTodo={handleAddTodo}
        NewTodoHandleChange={NewTodoHandleChange}
        task={task}
      />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
      />
    </>
  );
};

export default GlobalContainer;
