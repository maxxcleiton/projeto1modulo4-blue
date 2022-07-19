const TodoAPI = {
    todoEndpoint: () => `${Api.baseURL}/list`,
    todo: () => TodoAPI.todoEndpoint(),
    todoById: (id) => `${TodoAPI.todoEndpoint()}/${id}`,
}

export const Api = {
    baseURL: "http://localhost:8001", ...TodoAPI
}

const urls = {
    production: "https://tarefa-rest-api.herokuapp.com/",
    development: "http://localhost:8000",
  };