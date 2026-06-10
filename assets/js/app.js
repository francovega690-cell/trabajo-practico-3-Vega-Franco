const apiGeneral = "https://thesimpsonsapi.com/api/characters";
const apiIndividual = "https://thesimpsonsapi.com/api/characters/1";

let personajes = [];

const contenedor = document.querySelector("#contenedor");
const myModal = new bootstrap.Modal("#modal");
const titleH1 = document.querySelector("#staticBackdropLabel");

const obtenerPersonajesLs = async () => {
  try {
    const response = await fetch(apiGeneral);
    const data = await response.json();

    return data.results.slice(0, 20);
  } catch (error) {
    console.log(error);
  }
};
const obtenerUnPersonajeLs = async (idPersonaje) => {
  try {
    const response = await fetch(`${apiIndividual}${idPersonaje}`);
    const data = await response.json();

    return data[0];
  } catch (error) {
    console.log(error);
  }
};

const cargarPersonajesLs = async (id) => {
  personajes = await obtenerPersonajesLs();
  console.log(personajes[0]);
  personajes.forEach((element) => {
    contenedor.innerHTML += `
    <div class="card" style="width: 18rem">
      <img
        src="https://cdn.thesimpsonsapi.com/500${element.portrait_path}"
        class="card-img-top"
        alt="${element.name}"
      >
      <div class="card-body">
        <h5 class="card-title">${element.name}</h5>
        <p class="card-text">
             ${element.occupation}
            </p> 
        <p class="card-text">
              ${element.status}
            </p>
      </div>
    </div>
  `;
  });
};

cargarPersonajesLs();
