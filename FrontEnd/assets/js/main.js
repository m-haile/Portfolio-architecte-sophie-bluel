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

  const dialogElement = document.querySelector("dialog");
  const iconXs = document.querySelectorAll(".fa-xmark");

  iconXs.forEach(function (iconX) {
    iconX.addEventListener("click", (event) => {
      dialogElement.close();
    });
  });

  const modifier = document.querySelector(".modifier");

  modifier.addEventListener("click", (event) => {
    dialogElement.showModal();
  });

  getWorks().then((data) => {
    displayWorks(data);

    displayWorksInModal(data);
  });

  displayCategoryOptions();

  const firstScreen = document.querySelector(".first-screen");
  const secondScreen = document.querySelector(".second-screen");
  const arrowElement = document.querySelector(".fa-arrow-left");

  arrowElement.addEventListener("click", () => {
    firstScreen.style.display = "grid";
    secondScreen.style.display = "none";
  });

  const changeScreen = document.querySelector(".change-screen");

  changeScreen.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "grid";
  });

  const imageInput = document.querySelector("#image");

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    displayImage(file);
  });

  const titleInput = document.querySelector("#title");
  const categorySelect = document.querySelector("#category");

  function validateForm() {
    return (
      imageInput.value !== "" &&
      titleInput.value !== "" &&
      categorySelect.value !== ""
    );
  }

  const formList = document.querySelector(".form-list");
  const submitButton = document.querySelector(".submit-div button");

  formList.querySelectorAll("input,select").forEach((element) => {
    element.addEventListener("change", function () {
      if (validateForm()) {
        submitButton.classList.remove("disabled");
      } else {
        submitButton.classList.add("disabled");
      }
    });
  });

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

  getCategories();
}
