import { FC, useRef, useState } from "react";
import { useTodoContext } from "../Context/TodoContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";



const NewTodo: FC = () => {
  const { addTodo } = useTodoContext();
  const newTodo = useRef<HTMLInputElement | null>(null);
  const [task, setTask] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() !== "") {
      addTodo(task);
      setTask("");
      if (newTodo.current) newTodo.current.focus();
    }
  };

  return (
    <>
      <form onSubmit={handleAddTodo} className="mb-6">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new todo"
            ref={newTodo} // Attach the ref here
            className="flex-grow"
          />
          <Button type="submit">Add</Button>
        </div>
      </form>
    </>
  );
};

export default NewTodo;
