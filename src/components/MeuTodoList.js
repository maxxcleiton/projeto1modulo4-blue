import { useState, useEffect } from "react";

function MeuTodoList() {
  const baseURL = "http://localhost:8000/list";
  // https://github.com/maxxcleiton/backend-todolist.json-blue

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
  // Criar = CRUD
  async function Criar(todo) {
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
  // Criar todo (Criar = CRUD)
  const mexerMudancaCriar = (event) => {
    console.log("hangle change Criar");
    setNovaTodoList({
      ...novaTodolist,
      [event.target.name]: event.target.value,
    });
  };
  const mexerCriarTodo = () => {
    console.log("Criar ToDo: ");
    const todo_a_ser_criado = { ...novaTodolist };
    Criar(todo_a_ser_criado);
    setNovaTodoList({
      text: "",
    });
  };
  console.log(novaTodolist);

  // Read all
  async function renderizarTodosOsTudus() {
    const response = await fetch(baseURL);
    const todos = await response.json();
    setTodoList(todos);
  }

  useEffect(() => {
    renderizarTodosOsTudus();
  }, []);

  // Read by Id
  async function renderizarApenasUmTodo(id) {
    const response = await fetch(`${baseURL}/${id}`);
    const todo = await response.json();
    console.log("Retorno da API Todo: ", todo);
    setTodoList([todo]);
  }
  const mexerNoClick = (event) => {
    const pesquisa_todo_id = todo.todo_id;
    renderizarApenasUmTodo(pesquisa_todo_id);
  };
  const mexerMudanca = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value, });
  };
  return (
    <div>
      <a  className="button-home" href="http://localhost:3000/">
        <button type="button" className="button">Voltar pra HOME</button>
      </a>
      {/* Form do Criar */}
      <div className="button-label-input adicionar">
        <label htmlFor="criar_todo" className="button-label adicionar-text">
          adicionar à lista:
        </label>
        <input
          type="text"
          className="input"
          id="criar_todo"
          onChange={mexerMudancaCriar}
          name="text"
          value={novaTodolist.text}
        />
        <button
          type="button"
          className="button"
          onClick={mexerCriarTodo}
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
          onChange={mexerMudanca}
          name="todo_id"
          value={todo.todo_id}
          // value={novaTodolist.text}
        />
        <button type="button" className="button" onClick={mexerNoClick}>
          Pesquisar
        </button>
      </div>

      {/* Read All */}
      <div className="readAllMap">
        {todoList.map((todo, index) => (
          <div key={index} className="todoListReadAll">
            <span>→ </span>
            <input type="checkbox" />
            <span className="todo-text">  {todo.text} || ID: "{todo.id}"</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeuTodoList;
