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
  // // créer la balise dialog
  // const dialogElement = document.createElement("dialog");
  // const body = document.querySelector("body");
  // body.appendChild(dialogElement);

  /******* Premier écran   *******/ // create by html
  // const firstScreen = createDiv("first-screen", dialogElement);
  // const divNavigation = createDiv("navigation", firstScreen);
  // // divNavigation.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  // const iconX = document.createElement("i");
  // iconX.classList.add("fa-solid");
  // iconX.classList.add("fa-xmark");
  // divNavigation.appendChild(iconX);
  const dialogElement = document.querySelector("dialog");
  const iconX = document.querySelector(".fa-xmark");
  iconX.addEventListener("click", (event) => {
    dialogElement.close();
  });
  const modifier = document.querySelector(".modifier");
  modifier.addEventListener("click", (event) => {
    dialogElement.showModal();
  });
  // const divTitre = createDiv("titre", firstScreen);
  // divTitre.innerHTML = "<h2>Galerie photo</h2>";
  // const divGallery = createDiv("gallery-modal", firstScreen);
  // const divBouton = createDiv("bouton", firstScreen);
  // const boutonPhoto = document.createElement("button");
  // boutonPhoto.innerText = "Ajouter une photo";
  // divBouton.appendChild(boutonPhoto);
  displayWorksInModal();

  /******* Deuxième écran   *******/ // create by html
  // const secondScreen = createDiv("second-screen", dialogElement);
  // const secondNavigation = createDiv("navigation", secondScreen);
  // const secondTitre = createDiv("titre", secondScreen);
  // secondTitre.innerHTML = `<h2>Ajout photo</h2>`;
  // const form = createDiv("formulaire", secondScreen);
  // form.innerHTML = `<form>
  //   <label for="image"></label>
  //   <input hidden type="file" id="image" name="image"/>
  //   <label for="title">Titre</label>
  //   <input type="text" id="title" name="title"/>
  //   <label for="category">Catégorie</label>
  //   <select id="category" name="category"></select>
  //   <button type="submit">Valider</button>
  // </form>`;

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
