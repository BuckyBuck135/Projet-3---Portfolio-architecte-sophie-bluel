const loginForm = document.getElementById("login-form")
const emailInput = document.getElementById("email-input")
const passwordInput = document.getElementById("password-input")



 let isLoggedIn = false
// export {isLoggedIn}

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
        .then(res => res.json())
        .then(data => {
        console.log(data)
        // isLoggedIn = true
        setTimeout('window.location = "/index.html"', 2000);
        
        })
}
    //   .then(function(res) {
    //     if (res.ok) {
    //       return res.json();
    //     }
    //   })
    

// Submits login form //
loginForm.addEventListener("submit", sendLogin)