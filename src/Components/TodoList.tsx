import { FC, memo } from "react";
import TodoItem from "./TodoItem.tsx";
import { ITodoItem } from "../Interfaces/todos.tsx";

interface Props {
  todos: ITodoItem[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTask: string) => void;
}

const TodoList: FC<Props> = memo(
  ({ todos, toggleTodo, deleteTodo, editTodo }) => {

    return (
      <ul className="space-y-3 max-h-96 overflow-y-auto">
        {todos.map((todo: ITodoItem) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </ul>
    );
  }
);

export default TodoList;
