import Contacto from "./classContacto.js";

//declaro las variables
const modalContacto = new bootstrap.Modal(
  document.getElementById("modalAdminContacto")
);
const btnNuevo = document.getElementById("btnNuevo");
const formularioContacto = document.getElementById("formContacto");
//traigo los input del formulario
const apellido = document.getElementById("apellido");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const foto = document.getElementById("foto");
const github = document.getElementById("github"),
  direccion = document.getElementById("direccion"),
  telefono = document.getElementById("telefono");
//verificar si hay datos en localstorage, si hay los traigo sino que sea un array vacio.
const listaContactos =
  JSON.parse(localStorage.getItem("listaContactosKey")) || [];
const tabla = document.querySelector("tbody");
let estoyCreando = true;

//funciones
const mostrarModal = () => {
  modalContacto.show();
};

const crearContacto = () => {
 
  //aqui digo que quiero crear un contacto
  estoyCreando = true;
  //debo validar los datos del formulario
  //crear el objeto
  const nuevoContacto = new Contacto(
    apellido.value,
    nombre.value,
    email.value,
    telefono.value,
    github.value,
    direccion.value,
    foto.value
  );
  console.log(nuevoContacto);
  //quiero guardar el objeto en mi lista de contactos o array
  listaContactos.push(nuevoContacto);
  console.log(listaContactos);
  limpiarFormulario();
  //guardar el array en localstorage
  guardarEnLocalstorage();
  //dibujar la fila en la tabla
  dibujarFila(nuevoContacto);
};

const limpiarFormulario = () => {
  formularioContacto.reset();
};

const guardarEnLocalstorage = () => {
  localStorage.setItem("listaContactosKey", JSON.stringify(listaContactos));
};

const cargaInicial = () => {
  //preguntar si hay datos en el array
  if (listaContactos.length !== 0) {
    //dibujar una fila en la tabla
    listaContactos.map((contacto) => dibujarFila(contacto));
  }
};

const dibujarFila = (contacto) => {
  tabla.innerHTML += ` <tr>
                            <td>${contacto.id}</td>
                            <td>${contacto.apellido}</td>
                            <td>${contacto.nombre}</td>
                            <td>${contacto.email}</td>  
                            <td>
                                <button class="btn btn-primary">Ver</button>
                                <button class="btn btn-warning" onclick="prepararEditarContacto('${contacto.id}')">Editar</button>
                                <button class="btn btn-danger" onclick="borrarContacto('${contacto.id}')">Borrar</button>
                            </td>  
                        </tr>`;
};

window.borrarContacto = (id) => {
  console.log(id);
  Swal.fire({
    title: "¿Estas seguro de borrar el contacto?",
    text: "No puedes revertir este proceso, luego de borrar.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      //aqui agrego mi logica
      //1- buscar la posicion del elemento que quiero borrar findIndex
      const posicionContactoBuscado = listaContactos.findIndex(
        (contacto) => contacto.id === id
      );
      console.log(posicionContactoBuscado);
      //2- borrar un contacto del array splice, la posicion del elemento a borrar
      listaContactos.splice(posicionContactoBuscado, 1);
      //3- actualizar el localstorage
      guardarEnLocalstorage();
      //4- actualizar la tabla
      tabla.removeChild(tabla.children[posicionContactoBuscado]);

      Swal.fire({
        title: "Contacto eliminado",
        text: "El contacto fue eliminado correctamente",
        icon: "success",
      });
    }
  });
};

window.prepararEditarContacto = (id) => {
  console.log("aqui agrego la logica para prepar la edición");
  estoyCreando = false;
  mostrarModal();
  //aqui tengo que buscar el contacto y agregar sus valores en el formulario
  const encontrarContacto = listaContactos.find((contacto) => contacto.id === id)
  console.log(encontrarContacto)
  if (encontrarContacto) {
    apellido.value = encontrarContacto.apellido;
    nombre.value = encontrarContacto.nombre;
    email.value = encontrarContacto.email;
    telefono.value = encontrarContacto.telefono;
    github.value = encontrarContacto.github;
    direccion.value = encontrarContacto.direccion;
  }
};

const administrarContacto = (e) => {
  e.preventDefault();
  console.log("estamos en administrar contacto");
  if(estoyCreando){
    crearContacto()
  }else{
    modificarContacto()
  }
};

const modificarContacto=() =>{
 console.log('aqui guardo los datos del contacto modificado en el array y en el localstorage')
  //1 buscar la posicion del contacto a modificar
  //2- actualizar los datos del array
  listaContactos[0].apellido = apellido.value;
  listaContactos[0].nombre = nombre.value;
  listaContactos[0].email = email.value;
  //3 - actualizar el localstorage.
}

//aqui agrego la logica del CRUD
btnNuevo.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", administrarContacto);

cargaInicial();
