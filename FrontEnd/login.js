const loginForm = document.getElementById("login-form")
const emailInput = document.getElementById("email-input")
const passwordInput = document.getElementById("password-input")



// let isLoggedIn = true;

function sendLogin(e) {
    e.preventDefault();
    loginForm.style.color = "red"

    // fetch("http://localhost:5678/api/users/login", {
    //     method: "POST",
    //     headers: {
    //       'Accept': 'application/json', 
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         email: emailInput.value,
    //         password: passwordInput.value
    //     })
    //   })
    //   .then(function(res) {
    //     if (res.ok) {
    //         window.redirect("/index.html")  
    //       return res.json();
    //     }
    //   })
    }

// Submits login form //
loginForm.addEventListener("submit", sendLogin)
