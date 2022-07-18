import { useState, useEffect } from "react";
import { LabelInputButton } from "../LabelInputButton/LabelInputButton";
import { TodoServices } from "../../helpers/TodoServices";

export function ToDoList() {

  // Task list (todoList.map(()=>())
  const [todoList, setTodoList] = useState([]);

  // Read by ID
  const [todo, setTodo] = useState({
    todo_id: "",
  });

  // Read All new To Do List
  const [newTodoList, setNewTodoList] = useState({
    text: "",
  });

  // Show Edit Form
  const [showEditForm, setShowEditForm] = useState(false);

  // Edited task
  const [newEditedTodoTask, setNewEditedTodoTask] = useState({
    text: "",
    id: "",
  });

  // Delete Condicional Rendering
  const [showDeleteAsk, setShowDeleteAsk] = useState(false);

  // Async functions:

  // Create = CRUD
  async function Create(todo) {
    const novaTodo = TodoServices.create(todo);
    setTodoList([novaTodo]);
  }

  const handleSetTodoCriar = (event) => {
    // console.log("hangle change Create");
    setNewTodoList({
      ...newTodoList,
      [event.target.name]: event.target.value,
    });
  };
  const handleCreateTodo = () => {
    // console.log("Create ToDo: ");
    const todoBeingCreated = { ...newTodoList };
    Create(todoBeingCreated);
    setNewTodoList({
      text: "",
    });
  };

  // Read all (see every task from API)
  async function readAllTasks() {
    const todos = await TodoServices.getList();
    setTodoList(todos);
  }
  useEffect(() => {
    readAllTasks();
  }, []);

  // Read by Id (task details)
  async function readTaskById(id) {
    // console.log("API return: ", todo);
    const todo = await TodoServices.getById(id);
    setTodoList([todo]);
  }
  const handleSearchClickButton = (event) => {
    const searchTodo_id = todo.todo_id;
    readTaskById(searchTodo_id);
  };
  const handleSetTodo = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  // Update (Edit Task) 
  const onChangeInputEdit = (event) => {
    setNewEditedTodoTask({
      ...newEditedTodoTask,
      [event.target.name]: event.target.value,
    });
  };
  async function editTodo(id, editedTodo) {
    const response_editedTodo = await TodoServices.updateById(id, editedTodo);
    setNewEditedTodoTask({ ...response_editedTodo });
  };
  const onClickButtonEdit = () => {
    const editedTodo = { ...newEditedTodoTask };
    const id = editedTodo.id;

    delete editedTodo.id;
    setShowEditForm(false)
    editTodo(id, editedTodo);
  };

  // Delete task
  async function deleteTodo(id) {
    const responseFromDelete = await TodoServices.deleteById(id);
  };
  const whenClickDelete = (e) => {
    setShowDeleteAsk(true);
    setTodo({ todo_id: e.target.id });
  };
  const pleaseDeleteIt = () => {
    deleteTodo(todo.todo_id);
    window.location.reload(true);
  };

  return (
    <div>
      <a className="button-home" href="http://localhost:3000/">
        <button type="button" className="button">
          HOME
        </button>
      </a>

      {/* Create Form (create tasks) */}
      <LabelInputButton
        // Div and Label
        classNameDiv="adicionar"
        classNameLabel="adicionar-text"
        htmlForLabel="criar_todo"
        labelText="adicionar à lista:"
        // Input and Button
        classNameInput="input"
        idInput="criar_todo"
        onChangeInput={handleSetTodoCriar}
        inputValue={newTodoList.text}
        onClickButton={handleCreateTodo}
        nameInput="text"
        buttonText="adicionar."
      />

      {/* Read by Id Form (input search) */}
      <div className="button-label-input procurar">
        <label htmlFor="pesquisar_todo" className="button-label procurar-text">
          pesquisar item por ID:
        </label>
        <input
          type="text"
          className="input"
          id="pesquisar_todo"
          onChange={handleSetTodo}
          name="todo_id"
          value={todo.todo_id}
          // value={newTodoList.text}
        />
        <button type="button" className="button" onClick={handleSearchClickButton}>
          pesquisar.
        </button>
      </div>

      {/* Update (edit tasks) */}
        {showEditForm ? (
          <div className={"button-label-input update"}>
            <label htmlFor="update_todo" className={"button-label"}>
              adicione suas alterações:
            </label>
            <input
              type="text"
              className="input"
              id="update_todo"
              onChange={onChangeInputEdit}
              name="todo_update"
              value={newEditedTodoTask.text}
              // value={newTodoList.text}
            />
            <button
              // id={todoList.id}
              type="button"
              className="button-blue"
              onClick={onClickButtonEdit}
            >
              editar.
            </button>
          </div>
        ) : null}

      {/* Delete (delete tasks) */}
        {showDeleteAsk ? (
          <div className={"button-label-input update"}>
            <span className={"button-label"}>
              deseja mesmo excluir esse item da lista?
            </span>
            <button className="button-red" onClick={pleaseDeleteIt}>
              sim, delete.
            </button>
          </div>
        ) : null}

      {/* Read All (Show all tasks) */}
      <div className="readAllMap">
        {todoList.map((todo, index) => (
            <div className="todoListReadAll" key={index}>
              <input type="checkbox" />
              <span className="todo-text">
                {todo.text} ~ ID: "{todo.id}"
              </span>
              <button
                className="button-blue-map"
                onClick={() => setShowEditForm(true)}
              >
                Editar
              </button>
              <button
                className="button-red-map"
                type="button"
                id={todo.id}
                onClick={whenClickDelete}
              >
                Deletar
              </button>
            </div>
        ))}
      </div>
    </div>
  );
}