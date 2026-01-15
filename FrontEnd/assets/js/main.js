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
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach(function (element) {
    element.classList.remove("hidden");
  });
} else {
  // Déconnecté
  getCategories();
}
