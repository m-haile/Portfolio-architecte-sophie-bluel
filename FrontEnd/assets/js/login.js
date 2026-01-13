const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const passwordInput = document.querySelector("#password");
  const emailInput = document.querySelector("#email");

  if (passwordInput.value != "" && emailInput.value != "") {
    login(emailInput.value, passwordInput.value);
  }
});
