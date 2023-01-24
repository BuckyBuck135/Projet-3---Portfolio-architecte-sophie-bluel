const loginForm = document.getElementById("login-form")
const emailInput = document.getElementById("email-input")
const passwordInput = document.getElementById("password-input")
const loginMessage = document.getElementById("login-message")

// WORKING
function sendLogin(e) {
    e.preventDefault();
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailInput.value,
            password: passwordInput.value
        })
        })
        .then(res => {
            if (!res.ok) {
              throw new Error('Failed to retrieve token');
            }
            return res.json();
          })
        .then(data => {
        localStorage.setItem("token", data.token);
        
        // If using cookies =>
        // document.cookie = "token = " + data.token
        // console.log(document.cookie)
        
        sucessMessage()
        setTimeout('window.location = "/index.html"', 2000);
        setTimeout('loginMessage.style.display="none"', 2000);
        })
        .catch(error => {
            console.error(error.message);
            errorMessage()
        })
}


// REFACTORING - NOT WORKING
// async function sendLogin(e) {
//     e.preventDefault();
//     const options = {
//         method: 'POST',
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             email: emailInput.value,
//             password: passwordInput.value
//         })
//     }
//     try {
//         const data = await fetch("http://localhost:5678/api/users/login", options);
//         // console.log(data.json())
//         return data.json();
        
//         } 
//     catch (e) {
//         console.error(e.message)
//         return e;
//     }
// }

// async function loginProcess() {
//     const data = await sendLogin()
//     console.log(data.token)
// }


// Submits login form //
loginForm.addEventListener("submit", sendLogin) 

function sucessMessage() {
    loginMessage.style.display="block"
    loginMessage.classList.remove("error-message")
    loginMessage.classList.add("success-message")
    loginMessage.textContent = "Authentification réussie"
}

function errorMessage() {
    loginMessage.style.display="block"
    loginMessage.classList.remove("success-message")
    loginMessage.classList.add("error-message")
    loginMessage.textContent = "L'authentification a échoué"
}