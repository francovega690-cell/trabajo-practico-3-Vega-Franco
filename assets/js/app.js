const apiGeneral = "https://thesimpsonsapi.com/api/characters";
const apiIndividual = "https://thesimpsonsapi.com/api/characters/1";

let personajes = [];

const contenedor = document.querySelector("#contenedor");
const myModal = new bootstrap.Modal("#modal");
const titleH1 = document.querySelector("#staticBackdropLabel");
const buscador = document.querySelector("#buscador");
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

const mostrarPersonajes = (lista) => {
  contenedor.innerHTML = "";

  lista.forEach((element) => {
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

        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#modal-${element.id}"
        >
          Ver más
        </button>
      </div>
    </div>

    <div
      class="modal fade"
      id="modal-${element.id}"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">
              ${element.name}
            </h1>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <div class="modal-body">
            <img
              src="https://cdn.thesimpsonsapi.com/500${element.portrait_path}"
              class="img-fluid mb-3"
              alt="${element.name}"
            >

            <p><strong>Nombre:</strong> ${element.name}</p>
            <p><strong>Edad:</strong> ${element.age}</p>
            <p><strong>Género:</strong> ${element.gender}</p>
            <p><strong>Ocupación:</strong> ${element.occupation}</p>
            <p><strong>Estado:</strong> ${element.status}</p>
            <p><strong>Frases:</strong> ${element.phrases}</p>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
    `;
  });
};

const cargarPersonajesLs = async () => {
  personajes = await obtenerPersonajesLs();
  mostrarPersonajes(personajes);
};

buscador.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();

  const filtrados = personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(texto),
  );

  mostrarPersonajes(filtrados);
});
cargarPersonajesLs();
