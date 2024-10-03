import { memo, useEffect } from "react";
import GlobalContainer from "./Components/GlobalContainer.tsx";

const App = memo(() => {
  useEffect(() => {
    console.log("render App");
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex justify-center p-4 ">
        <div
          className="w-full max-w-md  bg-white rounded-xl shadow-lg p-6 mt-7"
          style={{ height: "80vh" }}
        >
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Todo App
          </h1>
          <GlobalContainer />
        </div>
      </div>
    </>
  );
});

export default App;
