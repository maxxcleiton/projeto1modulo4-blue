import { useState, useEffect } from "react";
import { LabelInputButton } from "./LabelInputButton/LabelInputButton";

function MeuTodoList() {
  const baseURL = "http://localhost:8001/list";
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

  const [showEditForm, setShowEditForm] = useState(false)

  // Novo state para capturar a todo atualizada. (Não sei como funciona ainda)
  const [todoAtualizado, setTodoAtualizado] = useState({
    text:"",
    id:""
  })

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
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };


  function showFormEdit(){
    {/* Update (Edit Task) */}
    <>
    <input type="text" />
    <button type="button">
      Editar
    </button>
    </>
  }

  return (
    <div>
      <a className="button-home" href="http://localhost:3001/">
        <button type="button" className="button">
          Voltar pra HOME
        </button>
      </a>

      {/* Form do Criar */}
      <LabelInputButton
        // Div e Label
        classNameDiv="adicionar"
        classNameLabel="adicionar-text"
        htmlForLabel="criar_todo"
        labelText="adicionar à lista:"
        // Input e Button
        classNameInput="input"
        idInput="criar_todo"
        onChangeInput={mexerMudancaCriar}
        inputValue={novaTodolist.text}

        onClickButton={mexerCriarTodo}
        nameInput="text"
        buttonText="adicionar."
      />
      {/* Form do Criar
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
      </div> */}

      {/* <div className="button-label-input {props.classNameDiv}">
        <label htmlFor={props.htmlForLabel} className="button-label {props.classNameLabel}">
          {props.labelText}
        </label>
        <input
          type="text"
          className={props.classNameInput}
          id={props.idInput}
          onChange={props.onChangeInput}
          name={props.nameInput}
          value={novaTodolist.text}
        />
        <button
          type="button"
          className="button"
          onClick={props.onClickButton}
        >
          {props.buttonText}
        </button>
      </div> */}

      {/* Form do Read by Id (pesquisar) */}
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

      {/* Read All (Show all tasks) */}
      <div className="readAllMap">
        {todoList.map((todo, index) => (
          <div>
          <div key={index} className="todoListReadAll">
            <span>→ </span>
            <input type="checkbox" />
            <span className="todo-text">
              {" "}
              {todo.text} || ID: "{todo.id}"
            </span>
            <button
            onClick={()=>setShowEditForm(true)}
            >Editar</button>
            <button>Deletar</button>
            </div>

            <div>
            {showEditForm ? 
                  <div className="editForm">
                    <input type="text" />
                    <button type="button">
                      Editar
                    </button>
                    </div>
            :null}
            </div>

            </div>
        ))}
      </div>
    </div>
  );
}

export default MeuTodoList;
