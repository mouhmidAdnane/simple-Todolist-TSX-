import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ITodoItem } from "../Interfaces/todos";

interface ITodoContext {
  todos: ITodoItem[];
  addTodo: (task: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  editTodo: (id: number, newTask: string) => void;
}

const TodoContext = createContext<ITodoContext | undefined>(undefined);


export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<ITodoItem[]>(
    localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")!) : []
  );

  const [lastId, setLastId] = useState<number>(
    todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) : 0
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((task: string) => {
    const newTodo: ITodoItem = {
      id: lastId + 1,
      task: task,
      done: false,
    };
    setLastId(lastId + 1);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  }, [lastId]);

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

  const editTodo= useCallback((id: number, newTask: string): void => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, task: newTask } : todo
      )
    );
  }, []);

  

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
