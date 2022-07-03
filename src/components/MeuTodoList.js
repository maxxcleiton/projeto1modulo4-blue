import { list_mock } from "../mock/list";
import { useState } from "react";

function MeuTodoList() {
  const [listas, setListas] = useState([...list_mock]);
  const [itemNovo, setItemNovo] = useState("");

  // console.log("listas: ", listas);
  // 
  const mostrarALista = (event) => {
    const clone = [...list_mock];
    //
    console.log(clone);
  setListas(clone);
};
    
  const adicionaNovoItemNaLista = (event) => {
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
};
  const remove = () => {
    
  }

  return (
    <main className="main">
      <div className="entire-TodoList">
        <div>
          <input
            onChange={handleChangeInput}
            placeholder="digite."
            value={itemNovo}
          />
        <button onClick={adicionaNovoItemNaLista}>adiciona.</button>        <button onClick={mostrarALista}>limpa.</button>
        </div>
        {/* <div>{itemNovo}</div> */}
        <h4><br/>fazer hoje →</h4>
        {listas.map((lista, index) => {
          return (
            <div key={`ItemList_${index}`}>
              <div>
                {/* <ul> */}
                  <input type="checkbox"/>{lista.item}
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



{/* <div>
<fieldset>
  <input type="checkbox" name="tarefa" value={lista.item} id={index}/>
  <label htmlFor="index">{lista.item}</label>
</fieldset>
<button onClick={remove}>remove.</button>
</div> */}