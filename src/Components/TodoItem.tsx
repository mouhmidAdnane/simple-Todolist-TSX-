import { FC, useState } from "react";
import { ITodoItem } from "../Interfaces/todos.tsx";
import { useTodoContext } from "../Context/TodoContext.tsx";
import { Trash2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox.tsx";
import { Input } from "./ui/input.tsx";
import { Button } from "./ui/button.tsx";

const TodoItem: FC<ITodoItem> = ({ id, task, done }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task);

  const { toggleTodo, deleteTodo, editTodo } = useTodoContext();

  return (
    <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
      <span className="mr-3 text-sm text-gray-500 w-8">#{id} </span>
      <span>
        <Checkbox onCheckedChange={() => toggleTodo(id)} checked={done} className="mr-3"/>
      </span>


      {isEditing ? (
        <Input
          className="flex-grow mr-3"
          type="text"
          value={editTask}
          onChange={(e) => setEditTask(e.target.value)}
          onBlur={() => {
            setIsEditing(false);
            editTodo(id, editTask);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") 
                setIsEditing(false);
            editTodo(id, editTask);
          }}
          autoFocus
        />
      ) : (

          <span
            className={`flex-grow mr-3 ${
              done ? "line-through text-gray-400" : ""
            }`}
            onClick={() => setIsEditing(true)}
          >
            {task}
          </span>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => deleteTodo(id)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </li>
  );
};

export default TodoItem;
