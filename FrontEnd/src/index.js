
// Constants
const galleryEl = document.getElementById("gallery")
const allWorksBtn = document.getElementById("all-works")
const objectsWorksBtn = document.getElementById("objects-works")
const apartmentsWorksBtn = document.getElementById("apartments-works")
const hotelsWorksBtn = document.getElementById("hotels-works")
const editDivs = document.getElementsByClassName("edit-div")
const logoutBtn = document.getElementById("logout-btn")
const editGalleryBtn = document.getElementById("edit-gallery-btn")
const editingModal = document.getElementById("editing-modal")



//////////////////// HOME PAGE PORTFOLIO ////////////////////

// Render all works by default
renderAllWorks()

// Fetch Works on http://localhost:5678/api/works
async function fetchApi() {
    try {
        const data = await fetch("http://localhost:5678/api/works");
        return data.json();
    } 
    catch (error) {
        return error;
    }
}

// Render all Works
async function renderAllWorks() {
    galleryEl.innerHTML = ""
    const works = await fetchApi();
    let html = ""
    for (let work of works) {
        html += `
        <figure>
            <img src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
            <figcaption>${work.title}</figcaption>
        </figure>
        `
    }
    galleryEl.innerHTML = html
}

// Render filtered Works
async function renderFilteredWorks(category) {
    galleryEl.innerHTML = ""
    const works = await fetchApi();
    let html = ""
    for (let work of works) {
        //checks category property
            if(work.categoryId === category) {
                html += `
                    <figure>
                        <img src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
                        <figcaption>${work.title}</figcaption>
                    </figure>
                `
            }
    }
    galleryEl.innerHTML = html
}

// Event listeners for Filter buttons - using 1 / 2 / 3 as arguments for categories Objets / Appartements / Hotels & restaurants

allWorksBtn.addEventListener("click", function() {
    renderAllWorks()
})

objectsWorksBtn.addEventListener("click", function() {
    renderFilteredWorks(1)
})

apartmentsWorksBtn.addEventListener("click", function() {
    renderFilteredWorks(2)
})

hotelsWorksBtn.addEventListener("click", function() {
    renderFilteredWorks(3)
})


// Submits contact form //
const contactForm = document.getElementById("contact-form")
contactForm.addEventListener("submit", function(e) {
    e.preventDefault()
})

// Logging in //

// let cookie = document.cookie 
if (localStorage.getItem("token") !== null) {
// if (cookie) {
    for (let i = 0; i<editDivs.length; i++) {
        editDivs[i].style.display = "flex"
    }
    logoutBtn.setAttribute("onclick", "logOut()")
}  else {
    for (let i = 0; i<editDivs.length; i++) {
        editDivs[i].style.display = "none"
    }
}

// Logging out
function logOut() {
    for (let i = 0; i<editDivs.length; i++) {
        editDivs[i].style.display = "none"
    }
    localStorage.removeItem("token")
}

///// Editing Modal /////
let modalIsVisible = false

editGalleryBtn.addEventListener("click", function(e) {
    editingModal.style.display="flex"
    modalIsVisible = true
})

/// CLICK OUTSIDE TO CLOSE NOT WORKING ///

document.addEventListener("click", function(e) {
    if(e.target == document.getElementById("mainBox")){
        console.log("click outside the modal")
        // closeModal()
        }
        else{
            return;
        }
})

function closeModal() {
    editingModal.style.display="none"
}

//  {
//     if (event.target == editingModal) {
//         editingModal.style.display="none"
//     }
//   }

// function checkVisible() {
//     if (modalIsVisible == true) {
//         document.addEventListener('click', function(event) {
//             const withinBoundaries = event.composedPath().includes(editingModal)
        
//         if (!withinBoundaries && modalIsVisible == true) {
//             editingModal.style.visibility="hidden"
//             modalIsVisible = false
//           console.log('Click happened **OUTSIDE** element')
//         } else {
//           console.log('Click happened inside element')
//         //   editingModal.style.visibility="hidden"
//         } 
//         })
// }
// }
    