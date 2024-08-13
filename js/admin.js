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
 const listaContactos = JSON.parse(localStorage.getItem('listaContactosKey')) || [];

//funciones
const mostrarModal = () => {
  modalContacto.show();
};

const crearContacto = (e) => {
  e.preventDefault();
  console.log("desde la funcion crear contacto");
  //debo validar los datos del formulario
  //crear el objeto
  const nuevoContacto = new Contacto(apellido.value, nombre.value, email.value, telefono.value, github.value, direccion.value,foto.value );
  console.log(nuevoContacto);
  //quiero guardar el objeto en mi lista de contactos o array
  listaContactos.push(nuevoContacto)
  console.log(listaContactos)
  limpiarFormulario();
  //guardar el array en localstorage
  guardarEnLocalstorage();
};

const limpiarFormulario = () =>{
    formularioContacto.reset(); 
}

const guardarEnLocalstorage = ()=>{
    localStorage.setItem('listaContactosKey', JSON.stringify(listaContactos));
}

//aqui agrego la logica del CRUD
btnNuevo.addEventListener("click", mostrarModal);
formularioContacto.addEventListener("submit", crearContacto);
