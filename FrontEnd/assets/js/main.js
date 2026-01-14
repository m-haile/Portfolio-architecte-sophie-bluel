getWorks();
getCategories();

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}
const token = localStorage.getItem("token");

if (token) {
  const loginElement = document.querySelector("#login-page");
  loginElement.innerText = "logout";
  loginElement.href = "#";

  loginElement.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
}
