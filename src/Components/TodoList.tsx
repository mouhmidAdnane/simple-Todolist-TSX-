import {FC} from "react"
import TodoItem from "./TodoItem.tsx"
import {ITodoList, ITodoItem} from "../Interfaces/todos.tsx"




const TodoList:FC<ITodoList>= ({todos}: ITodoList)=>{


    return (
        <ul className="space-y-3 max-h-96 overflow-y-auto">
          {todos.map((todo: ITodoItem) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
        </ul>
      );
} 

export default TodoList;
