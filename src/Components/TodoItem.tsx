import { FC, useState, memo } from "react";
import { ITodoItem } from "../Interfaces/todos.tsx";
import { Trash2 } from "lucide-react";
import { Checkbox } from "./ui/checkbox.tsx";
import { Input } from "./ui/input.tsx";
import { Button } from "./ui/button.tsx";

interface methods {
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTask: string) => void;
}

type Props = ITodoItem & methods;

const TodoItem: FC<Props> = memo(
  ({ id, task, done, editTodo, toggleTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editTask, setEditTask] = useState<string>(task);


    type editEvent =
      | React.ChangeEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>;

    const handleEditEvent = (e: editEvent) => {
      switch (e.type) {
        case "change":
          setEditTask((e.target as HTMLInputElement).value); // Type assertion for target value
          break;
        case "blur":
          setIsEditing(false);
          editTodo(id, editTask);
          break;
        case "keydown":
          if ((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter") {
            setIsEditing(false);
            editTodo(id, editTask);
          }
          break;
        default:
          break;
      }
    };

    const renderEditInput = () => {
      return (
        <Input
          className="flex-grow mr-3"
          type="text"
          value={editTask}
          onChange={(e) => handleEditEvent(e)}
          onBlur={(e) => handleEditEvent(e)}
          onKeyDown={(e) => handleEditEvent(e)}
          autoFocus
        />
      );
    };

    const renderTask = () => {
      return (
        <span
          className={`flex-grow mr-3 ${
            done ? "line-through text-gray-400" : ""
          }`}
          onClick={() => setIsEditing(true)}
        >
          {task}
        </span>
      );
    };

    return (
      <li className="flex items-center bg-white p-3 rounded-lg shadow-sm">
        <span className="mr-3 text-sm text-gray-500 w-8">#{id} </span>
        <span>
          <Checkbox
            onCheckedChange={() => toggleTodo(id)}
            checked={done}
            className="mr-3"
          />
        </span>

        {isEditing ? renderEditInput() : renderTask()}

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
  }
);

export default TodoItem;
