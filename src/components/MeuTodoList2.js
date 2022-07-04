import { list_mock } from "../mock/list";
import { useState, useEffect }  from "react";

function MeuTodoList() {
  // const [listas, setListas] = useState([...list_mock]);
  const [listas, setListas] = useState([]);

  const [itemNovo, setItemNovo] = useState({
    item_id: "",
    item_text: ""
  });

  const [novoItemJSON, setnovoItemJSON] = useState({
    id: "",
    text: ""
  })


  // console.log("listas: ", listas);
  //
  const mostrarALista = (event) => {
    const clone = [...list_mock];
    //
    console.log(clone);
    setListas(clone);
  };


  // CRUD consumindo API =>

  // To chamando minha api aqui hein!
  const baseURL = "http://localhost:8000/";

  //Create =>
  async function criar(item){
    //Fetch de create, com method post
    const response = await fetch(baseURL, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(item),
    })
  const novoItem = await response.json()
  console.log("Retorno do Create Item: ", novoItem)
  setItemNovo([novoItem])
  }

  const handleCriarItem = (event) => {
    // event.preventDefault()
    console.log("handleCriarItem")
    const item_sendo_criado = {...novoItemJSON}
    criar(item_sendo_criado)
    setnovoItemJSON({
      text: ""
    })
  }
  console.log(novoItemJSON)





  const adicionaNovoItemNaLista = (event) => {
    event.preventDefault()
    let new_list = {
      item: itemNovo,
    };
    console.log("new_list: ", new_list);
    const clone2 = [...listas];
    clone2.push(new_list);
    console.log("clone2: ", clone2);
    setListas(clone2);
    setItemNovo("");
  };
  const handleChangeInput = (event) => {
    setItemNovo(event.target.value);
    setItemNovo({...itemNovo, [event.target.name]: event.target.value})
  };

  return (
    <main className="main">
      <div className="entire-TodoList">

    {/* INPUTS E BUTTONS */}

    {/* ADICIONAR ITEM */}
        <div className="adicionar">
            <label className="adicionar-text">
            adicionar item.
            </label>

        <form>
          <input
            id="criar_adicionarItem"
            type="text"
            onChange={handleChangeInput}
            name="adicionarItem"
            value={itemNovo.item_text}
            placeholder="digite."
          />
          <button
          type="button"
          onClick={handleCriarItem}>adiciona.</button>
        </form>
          {/* <button onClick={mostrarALista}>limpa.</button> */}
        </div>

    {/* PROCURAR ITEM */}
        <div className="procurar">
          <label className="procurar-text">
            procurar item.
          </label>

          <form>
            <input
            
            placeholder="digite o id."
            
            />
            <button>pesquisar.</button>
          </form>
        </div>
        {/* <div>{itemNovo}</div> */}
        <h4>
          <br />
          fazer hoje →
        </h4>
        {listas.map((lista, index) => {
          return (
            <div key={`ItemList_${index}`}>
              <div>
                {/* <ul> */}
                <input type="checkbox" />
                {lista.item}
                {/* </ul> */}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default MeuTodoList;

{
  /* <div>
<fieldset>
  <input type="checkbox" name="tarefa" value={lista.item} id={index}/>
  <label htmlFor="index">{lista.item}</label>
</fieldset>
<button onClick={remove}>remove.</button>
</div> */
}
