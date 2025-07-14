 
 // importaciones de Service (consumo APIs)
import { post, get, deletes } from "../Service/api.js";
import { navigate } from "./router.js";
  const Urlusers = "http://localhost:3000/users"
  const Urlevents = "http://localhost:3000/events"
  const UrlEnrollnumber = "http://localhost:3000/enrollments"
 // Funcion register
 export function register () {

  let formulario = document.getElementById("formulario-register");

  formulario.addEventListener("submit", async (e) =>{
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
 
  const Users = await get (Urlusers);

  let userNuevo = {
    id: String(Users.length),
    name : name,
    email : email,
    password :password,
    role: "user",      
  }

  let createuser = await post(Urlusers, userNuevo);

  if(createuser){
    console.log("Usuario creado exitosamente");
    
  }else {
    console.log("Usuario no fue creado");
    
  }
});

}


// funcion login
export function login (){
  
  let formulario = document.getElementById("formulario-login");

  formulario.addEventListener("submit", async(e) =>{
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const users = await get(Urlusers)
  const user = users.find (user => user.email === email && user.password === password);

  if(user){
    alert("inicio de sesion exitoso");
    localStorage.setItem("useracces", "true");
    localStorage.setItem("rol", user.role);
    localStorage.setItem("userId", user.id);
    renderizado()
    navigate("/events")
  }else{
   alert("Contraseña o usuario incorrecto");

  }
  });
} 

// renderizado de botones y links
export function renderizado () {
  let acces = localStorage.getItem("useracces")=== "true";
  const rol = localStorage.getItem("rol");
  const login = document.querySelector(".sesions");
  const register = document.querySelector(".sesion");
  const logout = document.getElementById("logout");
  const enrollments = document.getElementById("enrollments");
  const events = document.getElementById("events")

  if (acces) {
    if(login) login.style.display = "none";
    if(register) register.style.display = "none";
    if(logout) logout.style.display = "inline-block";
    if(enrollments) enrollments.style.display = "inline-block";
    if(events)  events.style.display = "inline-block";
  
   if (rol === "user"){
    enrollments.style.display= "inline-block";
  }else {
    enrollments.style.display= "none";
  }

  }else{
    if(login) login.style.display = "inline-block";
    if(register) register.style.display = "inline-block";
    if (logout) logout.style.display = "none";
    if (enrollments) enrollments.style.display = "none";
    if (events)  events.style.display = "none";
  }
}

export async function renderizadoEventos() {
  const events = document.getElementById("contenedor-cursos");
  const rol = localStorage.getItem("rol");
  events.innerHTML = "";

  const eventos = await get(Urlevents);
  console.log(eventos);
  eventos.forEach((evento) => {
    const eventoElement = document.createElement("div");
    eventoElement.innerHTML = `
      <p>${evento.name}</p>
      <p>Description: ${evento.description}</p>
      <p>Capacity: ${evento.capacity}</p>
      <p>Date: ${evento.date}</p>
      ${rol == "user"
        ? `<button class="btn-acept" data-id="${evento.id}">enroll</button>`
        : ""
      }
      ${rol === "admin"
        ? `<button class="btn-delete" data-id="${evento.id}">Del</button>
           <button class="btn-edit" data-id="${evento.id}"><i class="fa-solid fa-pen"></i></button>`
        : ""
      }
    `;
    events.appendChild(eventoElement);
  });

  document.querySelectorAll(".btn-acept").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const eventId = parseInt(e.target.dataset.id);
      const userId = parseInt(localStorage.getItem("userId"));
      const allenrollments = await get(UrlEnrollnumber);
      const LoginLog = allenrollments.some(
        (enroll) => enroll.userId == userId && enroll.eventId === eventId
      );
      if (LoginLog) {
        alert("ya te inscribiste a este evento");
        return;
      }
      const enrollment = {
        id: String(allenrollments.length),
        userId,
        eventId
      };
      await post(UrlEnrollnumber, enrollment);
      alert("añadido correctamente");
    });
  });

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const eventId = btn.dataset.id;
      await deletes(Urlevents, eventId);
      alert("Evento eliminado exitosamente");
      renderizadoEventos();
    });
  });

  document.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const eventId = btn.dataset.id;
      const evento = eventos.find(event => String(event.id) === String(eventId));
      const nuevoNombre = prompt("Nuevo nombre del evento:", evento.name);
      const nuevaDescripcion = prompt("Nueva descripción:", evento.description);
      const nuevaCapacidad = prompt("Nueva capacidad:", evento.capacity);
      const nuevaFecha = prompt("Nueva fecha:", evento.date);

      if (nuevoNombre && nuevaDescripcion && nuevaCapacidad && nuevaFecha) {
        const editEvent = {
          ...evento,
          name: nuevoNombre,
          description: nuevaDescripcion,
          capacity: nuevaCapacidad,
          date: nuevaFecha
        };
        await update(Urlevents, eventId, editEvent);
        alert("Evento actualizado");
        renderizadoEventos();
      }
    });
  });


}