import { useState, useEffect } from "react";

function MeuTodoList() {
  const baseURL = "http://localhost:8000/list";

  // useState
  // Aqui é responsável pela renderização em tela (todoList.map(()=>())
  const [todoList, setTodoList] = useState([]);
  // Usado para fazer a pesquisa no Read by ID
  const [todo, setTodo] = useState({
    todo_id: "",
  });
  // Usado para definir nova lista no Read All
  const [novaTodolist, setNovaTodoList] = useState({
    text: "",
  });

  // Async functions
  // Create = CRUD
  async function create(todo) {
    const response = await fetch(baseURL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(todo),
    });
    const novaTodo = await response.json();
    setTodoList([novaTodo]);
  }

  // Read by ID

  // Handle functions (manejo)
  // Create todo (Create = CRUD)
  const handleChangeCreate = (event) => {
    console.log("hangle change create");
    setNovaTodoList({
      ...novaTodolist,
      [event.target.name]: event.target.value,
    });
  };
  const handleCreateTodo = () => {
    console.log("Create ToDo: ");
    const todo_a_ser_criado = { ...novaTodolist };
    create(todo_a_ser_criado);
    setNovaTodoList({
      text: "",
    });
  };
  console.log(novaTodolist);

  // Read all
  async function readAllTodo() {
    const response = await fetch(baseURL);
    const todos = await response.json();
    setTodoList(todos);
  }

  useEffect(() => {
    readAllTodo();
  }, []);

  // Read by Id
  async function readOneTodo(id) {
    const response = await fetch(`${baseURL}/${id}`);
    const paleta = await response.json();
    console.log("Retorno da API Todo: ", todo);
    setTodoList([todo]);
  }
  const handleClick = (event) => {
    const pesquisa_todo_id = todo.todo_id;
    readOneTodo(pesquisa_todo_id);
  };
  const handleChange = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };
  return (
    <div>
      <a  className="button-home" href="http://localhost:3000/">
        <button type="button" className="button">Voltar pra HOME</button>
      </a>
      {/* Form do Create */}
      <div className="button-label-input adicionar">
        <label htmlFor="criar_todo" className="button-label adicionar-text">
          adicionar à lista:
        </label>
        <input
          type="text"
          className="input"
          id="criar_todo"
          onChange={handleChangeCreate}
          name="text"
          value={novaTodolist.text}
        />
        <button
          type="button"
          className="button"
          onClick={handleCreateTodo}
        >
          adicionar.
        </button>
      </div>
      {/* Form do Read by Id */}
      <div className="button-label-input procurar">
        <label htmlFor="pesquisar_todo" className="button-label procurar-text">
          pesquisar item por ID:
        </label>
        <input
          type="text"
          className="input"
          id="pesquisar_todo"
          onChange={handleChange}
          name="text"
          value={todo.todo_id}
        />
        <button type="button" className="button" onClick={handleClick}>
          Pesquisar
        </button>
      </div>

      {/* Read All */}
      <span>ToDoList</span>
      <div className="readAllMap">
        {todoList.map((todo, index) => (
          <div key={index} className="todoListReadAll">
            <span>→ </span>
            <input type="checkbox" />
            <span className="todo-text"> {todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeuTodoList;
