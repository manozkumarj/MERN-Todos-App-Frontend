import React, { useState, useEffect, useRef } from "react";
import Loader from "../components/Loader";
import { getRandomString } from "../utils/helpers";
import { Pencil, Trash2 } from "lucide-react";
import Tooltip from '@mui/material/Tooltip';
import { Switch } from '@mui/material';
import Modal from "../components/Modal.jsx";

const tempTodo = [
  {
    id: "as12sf",
    title: "Learn AWS",
    isCompleted: true,
  },
  {
    id: "bs12sf",
    title: "Learn DevOps",
    isCompleted: false,
  },
];

const Dashboard = () => {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState(tempTodo);
  const inputFocus = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setTimeout(() => {}, 100000);
    inputFocus?.current?.focus();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const randomString = getRandomString(10);
    console.log("todo --> ", todo);
    // console.log("randomString --> ", randomString);
    const tempTodo = {
      id: randomString,
      title: todo,
      isCompleted: false,
    };
    const updatedTodos = [...allTodos, tempTodo];
    setAllTodos(updatedTodos);
    setTodo('');
  };

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className="container m-auto">
      <div className="flex p-6 bg-white">
        <div className="w-2/3 mx-auto">
          <form className="form w-full" onSubmit={onSubmit}>
            <div className="my-3 w-5/6 border-0 flex gap-4 justify-between items-center">
              <div className="w-5/6">
                <input
                  className={`w-full font-bold py-2.5 px-3 border-1 rounded-md`}
                  type="text"
                  id="email"
                  placeholder="Enter Todo (Press Enter to add.)"
                  autoComplete="off"
                  value={todo}
                  ref={inputFocus}
                  onChange={(e) => setTodo(e.target.value)}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-1/6 flex justify-center items-center text-white font-bold bg-blue-500 hover:bg-blue-700 rounded-lg text-lg px-5 ${
                  !isLoading ? "py-2.5 cursor-pointer" : "py-3.5"
                }`}
              >
                {isLoading && (
                  <Loader
                    size={"size-5"}
                    borderWidth={"border-3"}
                    lightThemeColor={"text-white"}
                    darkThemeColor={"text-red-600"}
                  />
                )}
                {!isLoading && <span>Add Todo</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-1/2 p-4 bg-white mx-auto mt-6 rounded-md shadow-[0px_0px_6px_0px_rgba(0,_0,_0,_0.1)] inset-shadow-2xs">
        {allTodos?.length === 0 && (
          <div className="my-8 text-center text-2xl font-bold text-gray-600">
            No Todos found
          </div>
        )}
        
        <Modal />

        {allTodos?.length > 0 &&
          allTodos?.map((_todo) => (
            <div className="w-full flex px-5 items-center gap-2 py-4 border-gray-600 border-b last:mb-0 last:border-b-0">
              <div
                className={`w-4/5 text-xl text-gray-600 font-bold ${
                  _todo?.isCompleted && "line-through"
                }`}
              >
                {_todo?.title}
              </div>
              <div className="w-1/5 flex items-center justify-around gap-3">
                <Tooltip title="Edit" arrow placement="top">
                  <Pencil className="text-gray-600 hover:text-blue-600 cursor-pointer" />{" "}
                </Tooltip>

                <Tooltip title="Delete" arrow>
                  <Trash2 className="text-gray-600 hover:text-red-600 cursor-pointer" />
                </Tooltip>

                <Tooltip title="Toggle Todo status" arrow placement="right">
                  <Switch checked={checked} onChange={switchHandler} />
                </Tooltip>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
