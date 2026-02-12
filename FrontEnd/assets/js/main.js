//Connecté si on a le token
const token = localStorage.getItem("token");
if (!token) {
  getWorks().then((data) => {
    displayWorks(data);
  });

  displayCategories();
} else {
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

  //pour functionement l'icone arrow qu'est dans le 2em modale
  const firstScreen = document.querySelector(".first-screen");
  const secondScreen = document.querySelector(".second-screen");
  const arrowElement = document.querySelector(".fa-arrow-left");

  //pour afficher le 1er modale
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

  //Selectionne  les inputs et le select du formulaire
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

    //si le formulaire est rempli
    if (validateForm()) {
      const image = document.querySelector("#image").files[0];
      if (validateImage(image)) {
        addNewWork(formList).then((success) => {
          if (!success) {
            errorMessage.innerText = "Erreur lors de l'ajout";
          }
        });
      } else {
        errorMessage.innerText =
          "L'image doit être au format .jpg ou .png et faire moins de 4 Mo.";
      }
    } else {
      errorMessage.innerText = "Veuillez remplir tous les champs";
    }
  });

  // Quand on click hors de la modale pour fermer la modale
  dialogElement.addEventListener("click", (event) => {
    if (event.target == dialogElement) {
      dialogElement.close();
    }
  });

  // Empêcher le comportement par défaut du glisser-déposer dans la fenêtre (empêche l'ouverture du fichier dans le navigateur)
  window.addEventListener("dragover", (e) => {
    // Empêcher uniquement le comportement par défaut lors du glisser-déposer d'un fichier
    if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
      e.preventDefault();
    }
  });

  // Empêcher le comportement par défaut de drop sur la fenêtre
  window.addEventListener("drop", (e) => {
    if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
      e.preventDefault();
    }
  });

  // Configurer la dropzone pour le téléchargement de fichiers
  const dropImage = document.querySelector(".image-label");
  dropImage.addEventListener("dragover", (e) => {
    e.preventDefault();
    // Afficher le curseur de copie lors du déplacement au-dessus de la dropzone
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = "copy";
    }
  });

  // Gérer le drop de fichiers dans la zone
  dropImage.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Récupère les fichiers
    const files = e.dataTransfer ? e.dataTransfer.files : null;
    //N'accepte qu'un seul fichier.
    if (files && files.length === 1) {
      const file = files[0];
      try {
        imageInput.files = files; // On met les fichiers dans input
        displayImage(file); // On affiche l'aperçu
        validateForm(); // On vérifie si tous les champs sont remplis
      } catch (error) {
        // Afficher le message d'erreur de validation
        errorMessage.innerText = error;
      }
    }
  });
}
