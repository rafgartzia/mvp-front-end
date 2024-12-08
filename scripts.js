/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/progressoes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.progressoes.forEach(item => insertList(item.cod_mapa, item.texto, item.ramo, item.etapa))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()




/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputProduct, inputQuantity, inputPrice) => {
  const formData = new FormData();
  formData.append('nome', inputProduct);
  formData.append('quantidade', inputQuantity);
  formData.append('valor', inputPrice);

  let url = 'http://127.0.0.1:5000/produto';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // let table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/produto?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputCode = document.getElementById("newCode").value;
  let inputDescription = document.getElementById("newDescription").value;

  let newBranchAndPhase = getBranchAndPhase();
  console.log("value: ", newBranchAndPhase)
  //let inputBranch = newBranchAndPhase[0]
  //let inputPhase = newBranchAndPhase[1]


  if (isNaN(inputCode)) {
    alert("Entre com o código da progressão!");
  } else if (inputDescription ===''){
    alert("Entre com a descrição da progressão!")
  } else if (newBranchAndPhase ===''){
    alert("Selecione um Ramo/Etapa")
  } else {
    console.log(inputCode, inputDescription, inputBranch, inputPhase)
    //insertList(inputProduct, inputQuantity, inputPrice)
    //postItem(inputProduct, inputQuantity, inputPrice)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para retonrae os valores Ramo e Etapa conforme radio button selecionado
  --------------------------------------------------------------------------------------
*/
const getBranchAndPhase = function () {
  let radioList = document.getElementsByName('newBranchAndPhase');
  radioList.forEach((radio) => {
    if(radio.checked){
      let str1 = radio.value
      console.log("ok!")
      str1.split("/")
    }
  })
}

const teste = () => {
  console.log("teste chamado")
  console.log(getBranchAndPhase())
}
 
/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (code, description, branch, phase) => {
  let item = [code, description, branch, phase]
  let table = document.getElementById('progTable');
  let row = table.insertRow();

  for (let i = 0; i < item.length; i++) {
    let cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newCode").value = "";
  document.getElementById("newText").value = "";
  document.getElementById("ramolobinho1").value = "";
  document.getElementById("ramolobinho2").value = "";
  document.getElementById("ramolobinho3").value = "";
  document.getElementById("ramolobinho4").value = "";
  document.getElementById("ramoescoteiro1").value = "";
  document.getElementById("ramoescoteiro2").value = "";
  document.getElementById("ramoescoteiro3").value = "";
  document.getElementById("ramoescoteiro4").value = "";
  document.getElementById("ramosenior1").value = "";
  document.getElementById("ramosenior2").value = "";
  document.getElementById("ramosenior3").value = "";

  removeElement()
}