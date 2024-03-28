import { useState } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      id: Math.random(),
      title,
      completed: true,
    };
    setTodos((prev) => {
      return [...prev, newTodo];
    });

    const music = new Audio("./add-music.mp3");
    music.play();
  }
  function handleDelete(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    const music = new Audio("./delete-music.mp3");
    music.play();
  }
  function saveEdit(e) {
    setTodos((prev) =>
    prev.map((todo) => {
      if (todo.id == id) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    })
  );
e.preventDefault();

    const editedTitle = document.getElementById("input-edit").value;
    const newTodo = {
      id: Math.random(),
      title:editedTitle,
      completed: true,
    };
    setTodos((prev) => {
      return [...prev ,newTodo];
    });
    setTitle(editedTitle);
    const modal = document.querySelector(".card-body");
    modal.classList.add("hidden");
  }
  function handleEdit(id) {
    const modal = document.querySelector(".card-body");
    modal.classList.remove("hidden");
    const todoToEdit = todos.find((todo) => todo.id === id);
    setTitle(todoToEdit.title);
  }
  function handleComplete(id) {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id == id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  }
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          className="inputAdd"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <button className="submitBtn">Add</button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id} className={todo.completed ? "completed" : ""}>
              <input
                type="checkbox"
                onChange={() => handleComplete(todo.id)}
                defaultChecked={todo.completed}
              />
              <h3>{todo.title}</h3>
              <button className="edit" onClick={() => handleEdit(todo.id)}>
                Edit
              </button>
              <button className="delete" onClick={() => handleDelete(todo.id)}>
                Delete
              </button>
            </li>
          );
        })}
      </ul>
      <div className={`card-body ${showModal ? "" : "hidden"}`}>
        <form id="form-edit">
          <div>
            <input
              id="input-edit"
              type="text"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span id="message-edit"></span>
          </div>
          <button className="edited" onClick={saveEdit}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
