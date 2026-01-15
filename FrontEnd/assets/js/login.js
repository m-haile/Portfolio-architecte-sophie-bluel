async function login(email, password) {
  const url = "http://localhost:5678/api/users/login";
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    console.log(`Response status: ${response.status}`);
    alert("Api introuvable");
    return true; //s'arrete la fonction
  }

  const result = await response.json();
  console.log(result.token);
  localStorage.setItem("token", result.token);
  window.location.href = "index.html";
}

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const passwordInput = document.querySelector("#password");
  const emailInput = document.querySelector("#email");

  if (passwordInput.value != "" && emailInput.value != "") {
    login(emailInput.value, passwordInput.value);
  }
});
