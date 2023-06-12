console.log(data);
const events = data.events;

//HACER CHECKBOX
const categorys = events.map((event) => event.category); //creo el array

//creo el set para eliminar las categorias repetidas
const categoryNoRepeat = new Set(categorys);
//lo convierto en  array para tener disponibles los metodos array
const arrayCategoryNoRepeat = Array.from(categoryNoRepeat);

//hacer checkbox-dinamicos
//un lugar donde poner los checkbox
const $form = document.getElementById("checkBoxCategorys");


const $seccion = document.getElementById("contenedor");

function creaTarjeta(eventos) {
  return `<div class="card bg-dark text-white shadow p-2 mb-5 ms-3 me-3 rounded border-white" style="width: 18rem;">
                            
    <img src="${eventos.image}" class="card-img-top bg-body-tertiary rounded" alt="...">
        
    <div class="card-body" >
        <h5 class="card-title justify-content-center"> ${eventos.name} </h5>
        <p class="card-text text-end">${eventos.date}</p>
        <p class="card-text text-center">${eventos.description}</p>
        
    </div> 
    <div class="card-body d-flex align-items-end justify-content-between ">
            <p>Price: $ ${eventos.price}</p>
            <a class=" link-light  text-decoration-none" href="/assets/paginas/details.html?id=${eventos._id}"><button class="btn btn-outline-secondary w-25 link-light  text-decoration-none ">Buy</button></a>
    </div>     
</div>`;
}

function mostrarCards(eventList, contenedor) {
  let template = "";
  for (let event of eventList) {
    const tarjeta = creaTarjeta(event);
    template += tarjeta;
  }
  contenedor.innerHTML = template;
}

mostrarCards(events, $seccion);

//crear una funcion que crea los checkbox
function createCheck(category) {
  return ` <div class>
          <input type="checkbox" id="${category}" name="Category" value="${category}">
          <label for="${category}">${category}</label>
        </div>`
        
}

function showCheckbox(categoryList, html){
  let checkboxTemplate = "";
  for(let category of categoryList){
    checkboxTemplate += createCheck(category)
  }
  html.innerHTML = checkboxTemplate
}

showCheckbox( arrayCategoryNoRepeat, $form )

$form.addEventListener('change', event =>{
  const checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(check => check.value)
 
  if(checked.length == 0){
    mostrarCards(events, $seccion)
  }
  else{
  const eventFilter = events.filter( events => checked.includes(events.category))
  mostrarCards(eventFilter, $seccion)
}
})  

const buttonSearch = document.getElementById("buttonSearch");

buttonSearch.addEventListener("click", () => {
  const searchValue = document.getElementById("search").value;
  const eventFilter = events.filter((event) => {
    return (
      event.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      event.description.toLowerCase().includes(searchValue.toLowerCase())
     
    );
  });
  mostrarCards(eventFilter, $seccion);
});

