import TodoList from "./Components/TodoList.tsx";
import { useTodoContext } from "./Context/TodoContext.tsx";
import NewTodo from "./Components/NewTodo.tsx";

function App() {
  const { todos } = useTodoContext();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center p-4 ">
        <div className="w-full max-w-md  bg-white rounded-xl shadow-lg p-6 mt-7" style={{height: "80vh"}}>
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Todo App
          </h1>
          <NewTodo />
          <TodoList todos={todos} />
        </div>
      </div>
    </>
  );
}

export default App;
