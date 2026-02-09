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

    return;
  }

  const result = await response.json();

  // on met le token dans localStorege
  localStorage.setItem("token", result.token);
  window.location.href = "index.html"; // envoyer utilisateur vers index.html
}

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const errorMessage = document.querySelector(".error-message");

  const passwordInput = document.querySelector("#password");
  const emailInput = document.querySelector("#email");

  if (
    passwordInput.value != "" &&
    emailInput.value != "" &&
    isValidEmail(emailInput.value)
  ) {
    login(emailInput.value, passwordInput.value);
  } else {
    errorMessage.innerText = "Entrez un email et un mot de passe.";
  }
});

//pour vérifier l'email (expression régulière)
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return emailRegex.test(email);
}
