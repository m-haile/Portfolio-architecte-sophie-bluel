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

  displayWorksInModal();

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

  dialogElement.showModal();
} else {
  // Déconnecté
  getCategories();
}
