//function login
async function login(email, password) {
  const url = "http://localhost:5678/api/users/login";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    console.log(`Response status: ${response.status}`);
    const errorMessage = document.querySelector(".error-message");
    errorMessage.style.display = "block";
    errorMessage.innerText = "Erreur dans l’identifiant ou le mot de passe";

    return true; //arrete la fonction
  }

  const result = await response.json();
  console.log(result.token);
  localStorage.setItem("token", result.token);
  window.location.href = "index.html"; // redirige(envoyer utilisateur) vers index.html
}

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const errorMessage = document.querySelector(".error-message");
  errorMessage.style.display = "none";

  const passwordInput = document.querySelector("#password");
  const emailInput = document.querySelector("#email");

  if (passwordInput.value != "" && emailInput.value != "") {
    login(emailInput.value, passwordInput.value);
  }
});
