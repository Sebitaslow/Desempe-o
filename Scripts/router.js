import { register, login, renderizado, renderizadoEventos } from "./app";
const routes = {
    "/": "./Pages/events.html",
    "/login": "./Pages/login.html",
    "/register": "./Pages/register.html",
    "/enrollments": "./Pages/enrollments.html",
    "/events": "./Pages/events.html",
    "/addevent": "./Pages/addevent.html",
};
//funcion de navegacion con las rutas
export async function navigate(pathname) {
    const access = localStorage.getItem("useracces") === "true";
    const rol = localStorage.getItem("rol");

    if ((pathname === "/login" || pathname === "/register") && access){
    alert("Ya iniciaste sesion");
    return navigate("/events");
  }

  

    //renderizadon de botones y links
  renderizado ()
  const route = routes[pathname];
  const html = await fetch(route).then((res) => res.text());
  document.getElementById("content").innerHTML = html;
  history.pushState({}, "", pathname);

  //llamado de variables 
  if(pathname === "/register"){
    register();
    } else if (pathname === "/login"){
        login();
    } else if(pathname === "/events"){
        renderizadoEventos()
    }
}
document.body.addEventListener("click", (e) => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const path = e.target.getAttribute("href");
    navigate(path);
  }
// Boton para eliminar localStorage
  if (e.target.id === "logout"){
    localStorage.removeItem("useracces");
    localStorage.removeItem("rol");
    localStorage.removeItem("userId")
    console.log("Se ha cerrado sesion");
    
    renderizado();
    navigate("/login");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  navigate(location.pathname);
});

window.addEventListener("popstate", () => {
  console.log("se hizo clic");
  console.log(location);
  navigate(location.pathname);
});