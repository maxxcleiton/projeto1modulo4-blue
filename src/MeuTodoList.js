import { list_mock } from "./mock/list";
import { useState } from "react";

function MeuTodoList() {
  // Preciso arrumar meu input para adicionar na lista. A lista é um mockup.
  // Criar mockup. Criei. list.jsx. Adicionar ele. Importei.
  // Criar useState para puxar dados do input.

  // Esse useState meio que clona o list_mock e o torna o valor inicial do state
  const [listas, setListas] = useState([...list_mock]);
  console.log("listas: ", listas)
  
  // setListas é uma function que vai atualizar o listas
  // Depois desse useState, la na frente o listas no mock lá na função addNewListItem

  // Esse useState tem como estado inicial nada, para depois ser atualizado conforme as funcoes 
  const [newListItem, setNewListItem] = useState("");

  const handleShowLista = (event) => {
    // isso aqui clona o mock original:
    const clone = [...list_mock];

    // const aux = clone.splice(5, 5);
    console.log(clone);
    // console.log(aux);

    // isso aqui coloca o clone do mock original lá no useState de listas, onde mostra todas as listas, basicamente limpando-o com o mock original, pode ser usado para limpar a lista inteira, como um Clear
    setListas(clone);
  };

  // aqui cria um novo item na lista
  const addNewListItem = (event) => {
    let new_list = {
      item: newListItem, // item novo adicionado o newList que vai ser o dado do input, lá dentro de value{newList}
    };

    // aqui mostra o valor novo adicionado
    console.log("new_list: ", new_list)

    const clone2 = [...listas]; // clonando o listas (que é o total de items exibidos após alteração) e armazenando na const = clone2

    clone2.push(new_list); // dando push do novo item de lista (digitado no input) no clone2 (clone de listas que é o total de items exibidos)

    console.log("clone2: ", clone2)

    setListas(clone2); // aqui finalmente atualiza o novo "listas", que é o clone2 já atualizado com o novo new_list (adicionado via input)
    setNewListItem("");
  };
  // console.log(clone2)

  const handleChangeInput = (event) => {
    // isso aqui exibe no console o valor que está sendo digitado no input:
    console.log(event.target.value);
    // isso aqui seta o danado do valor que está sendo digitado no input, dentro do setNewListItem, que é uma função do useState que vai adicionar dentro do novo valor da "to do list":
    setNewListItem(event.target.value);
    // ele pega o valor do input e seta dentro da function de listas, assim exibindo-o
  };

  return (
    <div>
      {/* Preciso de um componente para  */}
      <h2>Meu To do em ReactJS</h2>
      <div style={{borderTop: "0.2rem solid", maxWidth: "20rem", marginTop: "2rem"}} />

      {/* Aqui vai ser a renderização da lista */}
      <h4>Items list:</h4>
      {/* map que vai percorrer o listas que guarda  */}
      {listas.map((lista, index) => {
        return (
          <div key={`ItemList_${index}`}>
            <div>
              {/* <div>{index}</div> */}
              <ul>
                <li>{lista.item}</li>
              </ul>
              
            </div>
          </div>
        )})}
        {/* isso aqui ao clicar mostra a lista original do mock: */}
        <button onClick={handleShowLista}
        // ao clicar ele executa essa funcao que limpa os novos dados e deixa a lista (mock) original
        >Limpar</button>
        <div>
          <input
            onChange={handleChangeInput} //ao modificar, ele executa o handleChangeInput que é algo que o adiciona na lista de tudo
            placeholder="Digite sua tarefa"
            value={newListItem} // o value aqui conecta o input ao newList
          />
      </div>
      <div>{newListItem}</div>
      <button onClick={addNewListItem}
      // ao clicar ele chama a funcao addNewListItem que faz todo o processo de adicionar dentro do mock a nova informacao que estava dentro do input
      >Adicionar</button>
    </div>
  );
}

export default MeuTodoList;
