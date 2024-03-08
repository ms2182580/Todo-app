import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

export default function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDiscription, setNewDiscription] = useState("");
  const [CompletedTodos, setCompletedTodos] = useState([]);

  function handleAddTodo() {
    let newTodoItem = {
      title: newTitle,
      description: newDiscription,
    };
    setTodos((setPrevious) => [...setPrevious, newTodoItem]);
    localStorage.setItem(
      "todolist",
      JSON.stringify([...allTodos, newTodoItem])
    );

    setNewTitle("");
    setNewDiscription("");
  }
  function handleDeleteTodo(index) {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);
    setTodos(reducedTodo);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
  }
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todolist"));
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);
  let handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yy = now.getFullYear();
    let hh = now.getHours();
    let mmm = now.getMinutes();
    let ss = now.getSeconds();
    let CompletedOn =
      dd + "-" + mm + "-" + yy + "at" + hh + ":" + mmm + ":" + ss;
    let filteredItem = {
      ...allTodos[index],
      CompletedOn: CompletedOn,
    };
    setCompletedTodos((setPrevious) => [...setPrevious, filteredItem]);
  };
  return (
    <>
      <div className="App">
        <h1> My Todos</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="what the task title"
              ></input>
            </div>
            <div className="todo-input-item">
              <label>Description</label>
              <input
                type="text"
                value={newDiscription}
                onChange={(e) => setNewDiscription(e.target.value)}
                placeholder="what the description"
              ></input>
            </div>
            <button
              type="button"
              className="primaryBtn"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
          <div className="btn-area">
            <button
              type="button"
              className={`secondaryBtn ${!isCompleted ? "active" : ""}`}
              onClick={() => setIsCompleted(false)}
            >
              Todo
            </button>
            <button
              type="button"
              className={`secondaryBtn ${isCompleted ? "active" : ""}`}
              onClick={() => setIsCompleted(true)}
            >
              Completed
            </button>
          </div>
          <div className="Todo-list-area">
            {allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div>
                    <AiOutlineDelete
                      className="delete-icon icon"
                      title="delete"
                      onClick={() => handleDeleteTodo(index)}
                    />
                    <BsCheckLg
                      className="check-icon   "
                      onClick={() => handleComplete(index)}
                      title="Check-icon"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
