import {sendLogin} from './api.js'


const loginForm = document.getElementById("login-form")
const loginMessage = document.getElementById("login-message")
export const emailInput = document.getElementById("email-input")
export const passwordInput = document.getElementById("password-input")


console.log(loginForm)
// Submits login form //
loginForm.addEventListener("submit", sendLogin) 

export function loginErrorMessage() {
    loginMessage.style.display="block"
    loginMessage.classList.remove("success-message")
    loginMessage.classList.add("error-message")
    loginMessage.textContent = "L'authentification a échoué. Veuillez vérifier votre email et/ou votre mot de passe."
}