const loginForm = document.getElementById("login-form")
const emailInput = document.getElementById("email-input")
const passwordInput = document.getElementById("password-input")


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
        localStorage.setItem("token", data.token);
                console.log(localStorage.getItem("token"))

        // document.cookie = "token = " + data.token
        // console.log(document.cookie)

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