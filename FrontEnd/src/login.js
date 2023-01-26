import {sendLogin} from '/src/api.js'

const loginForm = document.getElementById("login-form")
const emailInput = document.getElementById("email-input")
const passwordInput = document.getElementById("password-input")
const loginMessage = document.getElementById("login-message")

export const user = {
    email: emailInput.value,
    password: passwordInput.value
}

// Submits login form //
loginForm.addEventListener("submit", sendLogin) 

export function loginErrorMessage() {
    loginMessage.style.display="block"
    loginMessage.classList.remove("success-message")
    loginMessage.classList.add("error-message")
    loginMessage.textContent = "L'authentification a échoué. Veuillez vérifier votre email et/ou votre mot de passe."
}