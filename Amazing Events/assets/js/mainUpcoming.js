const events = data.events;
const $upCheck = document.getElementById("upCheck");
const $sectionUpcomigEvents = document.getElementById("sectionUpcomigEvents");
const categorys = events.map((event) => event.category);

const categoryNoRepeat = new Set(categorys);
const arrayCategoryNoRepeat = Array.from(categoryNoRepeat);

let currentDateup = data.currentDate;

function creaTarjeta(eventos) {
  return `
    <div class="card bg-dark text-white shadow p-2 mb-5 ms-3 me-3 rounded border-white" style="width: 18rem;">
      <img src="${eventos.image}" class="card-img-top bg-body-tertiary rounded" alt="...">
      <div class="card-body">
        <h5 class="card-title justify-content-center">${eventos.name}</h5>
        <p class="card-text text-end">${eventos.date}</p>
        <p class="card-text text-center">${eventos.description}</p>
      </div> 
      <div class="card-body d-flex align-items-end justify-content-between">
        <p>Price: $ ${eventos.price}</p>
        <button class="btn btn-outline-secondary w-25">
        <a class=" link-light  text-decoration-none" href="/assets/paginas/details.html?id=${eventos._id}"><button class="btn btn-outline-secondary w-25 link-light  text-decoration-none ">Buy</button></a>
        </button>
      </div>     
    </div>`;
}

function mostrarCardsUp(array, elementoHTML) {
  let template = "";
  for (let elemento of array) { 
    if (new Date(currentDateup) < new Date(elemento.date)) {
      template += creaTarjeta(elemento);
    }
  }
  elementoHTML.innerHTML = template;
}

mostrarCardsUp(events, $sectionUpcomigEvents);

function createCheck(category) {
  return `
    <div>
      <input type="checkbox" id="${category}" name="Category" value="${category}">
      <label for="${category}">${category}</label>
    </div>`;
}

function showCheckbox(categoryList, html) {
  let checkboxTemplate = "";
  for (let category of categoryList) {
    checkboxTemplate += createCheck(category);
  }
  html.innerHTML = checkboxTemplate;
}

showCheckbox(arrayCategoryNoRepeat, $upCheck);

$upCheck.addEventListener('change', event => {
  const checked = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(check => check.value);
 
  if (checked.length === 0) {
    mostrarCardsUp(events, $sectionUpcomigEvents);
  } else {
    const eventFilter = events.filter( events => checked.includes(events.category))
  mostrarCards(eventFilter, $sectionUpcomigEvents)
  }
})
