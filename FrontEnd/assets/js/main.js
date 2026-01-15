getWorks();

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
const token = localStorage.getItem("token");

if (token) {
  //Connecté
  const loginElement = document.querySelector("#login-page");
  loginElement.innerText = "logout";
  loginElement.href = "#";

  loginElement.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
  // pour ajouter d'icon de mod édition
  const iconHtml = `<i class="fa-regular fa-pen-to-square"></i>`;
  const divElement = document.createElement("div");
  divElement.classList.add("icon-div");
  divElement.innerHTML = iconHtml + "Mode édition";
  const body = document.querySelector("body");
  body.prepend(divElement);
} else {
  // Déconnecté
  getCategories();
}
