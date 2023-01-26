// import {sendLogin} from '/src/api.js'

const loginForm = document.getElementById("login-form")
const emailInput = document.getElementById("email-input")
const passwordInput = document.getElementById("password-input")
const loginMessage = document.getElementById("login-message")

 const user = {
    email: emailInput.value,
    password: passwordInput.value
}


 async function sendLogin(e) {
    e.preventDefault();
    try {
        const res = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        if (!res.ok) {
            throw new Error('Failed to retrieve token');
        }
        const data = await res.json()
        localStorage.setItem("token", data.token);
        
        // If using cookies =>
        // document.cookie = "token = " + data.token
        // console.log(document.cookie)
        
        window.location = "/index.html"
        } 
    catch (error) {
        console.error(error.message);
        loginErrorMessage()
    }
}

// Submits login form //
loginForm.addEventListener("submit", sendLogin) 

function loginErrorMessage() {
    loginMessage.style.display="block"
    loginMessage.classList.remove("success-message")
    loginMessage.classList.add("error-message")
    loginMessage.textContent = "L'authentification a échoué. Veuillez vérifier votre email et/ou votre mot de passe."
}