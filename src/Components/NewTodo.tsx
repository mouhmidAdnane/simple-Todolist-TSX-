import { FC, useRef, memo} from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface props {
  handleAddTodo: (e: React.FormEvent) => void;
  NewTodoHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  task: string;
}

const NewTodo: FC<props> = memo(
  ({ handleAddTodo, NewTodoHandleChange, task }) => {
    const newTodo = useRef<HTMLInputElement | null>(null);

    return (
      <>
        <form onSubmit={(e) => handleAddTodo(e)} className="mb-6">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={task}
              onChange={(e) => NewTodoHandleChange(e)}
              placeholder="Add a new todo"
              ref={newTodo}
              className="flex-grow"
            />
            <Button type="submit">Add</Button>
          </div>
        </form>
      </>
    );
  }
);

export default NewTodo;
