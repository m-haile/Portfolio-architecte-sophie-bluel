displayWorks();

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
const token = localStorage.getItem("token");

if (token) {
  //Connecté si on a le token
  const loginElement = document.querySelector("#login-page");
  loginElement.innerText = "logout";
  loginElement.href = "#";

  loginElement.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach(function (element) {
    element.classList.remove("hidden");
  });
  // créer la balise dialog
  const dialogElement = document.createElement("dialog");
  const body = document.querySelector("body");
  body.appendChild(dialogElement);

  const firstScreen = createDiv("first-screen", dialogElement);
  const divNavigation = createDiv("navigation", firstScreen);
  const divTitre = createDiv("titre", firstScreen);
  divTitre.innerHTML = "<h2>Galerie photo</h2>";
  const divGallery = createDiv("gallery-modal", firstScreen);
  const divBouton = createDiv("bouton", firstScreen);
  const boutonPhoto = document.createElement("button");
  boutonPhoto.innerText = "Ajouter une photo";
  divBouton.appendChild(boutonPhoto);
  displayWorksInModal();
  dialogElement.showModal();
} else {
  // Déconnecté
  getCategories();
}

function createDiv(classe, parent) {
  const divElement = document.createElement("div");
  divElement.classList.add(classe);
  parent.appendChild(divElement);
  return divElement;
}
