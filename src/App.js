import { useStore, actions } from "./store";
import { useRef, useState } from "react";

function App() {
  const [name, setName] = useState("Add");
  const [newIndex, setIndex] = useState(0);
  const [state, dispatch] = useStore();
  const { todos, todoInput } = state;

  const refInput = useRef();

  const handleAdd = () => {
    dispatch(actions.addTodo(todoInput));
    dispatch(actions.setTodoInput(""));

    refInput.current.focus();
  };

  const handleEdit = (index) => {
    setName("Update");
    setIndex(index);
    dispatch(actions.editTodo(index));
    refInput.current.focus();
  };
  const handleUpdate = (newIndex) => {
    setName("Add");
    dispatch(actions.updateTodo(newIndex));
    dispatch(actions.setTodoInput(""));

    refInput.current.focus();
  };

  return (
    <div>
      <input
        ref={refInput}
        value={todoInput}
        placeholder="Enter todo..."
        onChange={(e) => {
          dispatch(actions.setTodoInput(e.target.value));
        }}
      />
      <button
        onClick={name === "Add" ? handleAdd : () => handleUpdate(newIndex)}
      >
        {name}
      </button>
      {todos.map((todo, index) => (
        <li key={index}>
          {todo}
          <button
            onClick={() => {
              handleEdit(index);
            }}
          >
            edit
          </button>
          <button onClick={() => dispatch(actions.deleteTodo(index))}>
            delete
          </button>
        </li>
      ))}
    </div>
  );
}

export default App;
