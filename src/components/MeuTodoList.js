import { useState, useEffect } from "react";

function MeuTodoList() {
    const baseURL = 'http://localhost:8000/list';

    // useState
    // Aqui é responsável pela renderização em tela (todoList.map(()=>())
    const [ todoList, setTodoList ] = useState([])
    // Usado para fazer a pesquisa no Read by ID
    const [todo, setTodo ] = useState({
        todo_id: ""
    })
    // Usado para definir nova lista no Read All
    const [novaTodolist, setNovaTodoList ] = useState({
        text: ""
    })

    // Async functions
    // Create = CRUD
    async function create(todo) {
        const response = await fetch(baseURL, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(todo),
    })
    const novaTodo = await response.json()
    setTodoList([novaTodo])
    }
   

    // Read by ID

    // Handle functions (manejo)
    // Create todo (Create = CRUD)
    const handleChangeCreate = (event) => {
        console.log("hangle change create")
        setNovaTodoList({...novaTodolist, [event.target.name]: event.target.value})
    }
    const handleCreateTodo = () => {
        console.log('Create ToDo: ')
        const todo_a_ser_criado = {...novaTodolist};
        create(todo_a_ser_criado)
        setNovaTodoList({
            text: ""
        })
    }
    console.log(novaTodolist)

    // Read all
    async function readAllTodo(){
        const response = await fetch(baseURL)
        const todos = await response.json()
        setTodoList(todos)
    }

    useEffect(() => {
        readAllTodo()
    }, [])

    return (
        <div>
            {/* Form do Create */}
            <div className="button-label-input">
                <label
                htmlFor="criar_todo"
                className="button-label">
                    Digite o que irá fazer
                </label>
            <input
            type="text"
            className="button-input"
            id="criar_todo"
            onChange={handleChangeCreate}
            name="text"
            value={novaTodolist.text}
            />
            </div>
            <button
            type="button"
            className="button-button"
            onClick={handleCreateTodo}>
                Adicionar novo todo
            </button>
            {/* Form do Read by Id */}

            {/* Read All */}
            <div>
            {todoList.map((todo, index) => (
                <div key={index} className="todoListReadAll">
                    <input type="checkbox"/>
                    <span>{todo.text}</span>
                </div>
            ))}
            </div>
        </div>
    )
}

export default MeuTodoList