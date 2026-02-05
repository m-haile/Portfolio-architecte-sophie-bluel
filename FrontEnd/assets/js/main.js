//pour déconecter
function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

//Connecté si on a le token
const token = localStorage.getItem("token");
if (token) {
  const loginElement = document.querySelector("#login-page");
  loginElement.innerText = "logout";
  loginElement.href = "#"; //pour rester sur la meme page

  loginElement.addEventListener("click", (e) => {
    e.preventDefault(); //pour ne pas faire l'action par défaut
    logout();
  });

  //pour ça montre on est connecter (Mode édition(banner) icone modifier)
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach(function (element) {
    element.classList.remove("hidden");
  });

  // pour fonctionnement le x (pour férmé la modale)
  const dialogElement = document.querySelector("dialog");
  const iconXs = document.querySelectorAll(".fa-xmark");
  iconXs.forEach(function (iconX) {
    iconX.addEventListener("click", (event) => {
      dialogElement.close();
    });
  });

  // Quand en click sur icon modifier pour afficher la modale
  const modifier = document.querySelector(".modifier");
  modifier.addEventListener("click", (event) => {
    dialogElement.showModal();
  });

  //data c'est le résultat de getWorks
  getWorks().then((data) => {
    //.then pour attendre la réponse
    displayWorks(data);

    displayWorksInModal(data);
  });

  displayCategoryOptions();

  //pour functionement l'icone arrow qu'est dans le 2em ecran
  const firstScreen = document.querySelector(".first-screen");
  const secondScreen = document.querySelector(".second-screen");
  const arrowElement = document.querySelector(".fa-arrow-left");

  //pour afficher le 1er écran
  arrowElement.addEventListener("click", () => {
    firstScreen.style.display = "grid";
    secondScreen.style.display = "none";
  });

  //Changement d'écran 1er à 2em
  const changeScreen = document.querySelector(".change-screen"); //bouton ajouter une photo
  changeScreen.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "grid";
  });

  //pour l'aprçu de l'image
  const imageInput = document.querySelector("#image");
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    displayImage(file);
  });

  //pour verfier qu'il n'y a pas de champ vide dans le formulaire .
  const titleInput = document.querySelector("#title");
  const categorySelect = document.querySelector("#category");
  function validateForm() {
    return (
      imageInput.value !== "" &&
      titleInput.value !== "" &&
      categorySelect.value !== ""
    );
  }

  //Selectionne le formulaire
  const formList = document.querySelector(".form-list");
  const submitButton = document.querySelector(".submit-div button");

  formList.querySelectorAll("input,select").forEach((element) => {
    element.addEventListener("change", function () {
      if (validateForm()) {
        submitButton.classList.remove("disabled"); //remove la classe disabled et active le button valider
      } else {
        submitButton.classList.add("disabled"); // add la classe disbaled et désactive le button valider.
      }
    });
  });

  //pour envoyer les données à la base de donnée
  formList.addEventListener("submit", (e) => {
    e.preventDefault();

    const errorMessage = document.querySelector(".error-message");
    if (validateForm()) {
      addNewWork(formList).then((success) => {
        if (!success) {
          errorMessage.innerText = "Erreur lors de l'ajout";
        }
      });
    } else {
      errorMessage.innerText = "Veuillez remplir tous les champs";
    }
  });

  // Close modal when clicking outside (on backdrop)
  dialogElement.addEventListener("click", (event) => {
    if (event.target == dialogElement) {
      dialogElement.close();
    }
  });
} else {
  getWorks().then((data) => {
    displayWorks(data);
  });

  displayCategories();
}
