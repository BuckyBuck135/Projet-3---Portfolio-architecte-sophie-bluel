
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


// Submits contact form - Currently not connected to server//
const contactForm = document.getElementById("contact-form")
contactForm.addEventListener("submit", function(e) {
    e.preventDefault()
})

///// Logging in /////

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

///// Logging out /////
function logOut() {
    for (let i = 0; i<editDivs.length; i++) {
        editDivs[i].style.display = "none"
    }
    localStorage.removeItem("token")
}

///// Editing Modal /////

// Display the modal on click
editGalleryBtn.addEventListener("click", function(e) {
    editingModal.style.display="flex"
})

// Close the modal on click on the X button OR outside of the modal 
document.addEventListener("click", function(e) {
    if (
        e.target.matches("#modal-close") 
        || !e.target.matches(".editing-modal") 
        & !e.target.matches("#modal-form") 
        & !e.target.matches("#modal-grid")
        & !e.target.matches(".modal-header")
        & !e.target.matches(".modal-figure")
        & !e.target.matches(".modal-img")
        & !e.target.matches(".modal-caption")
        & !e.target.matches(".add-photo-btn")
        & !e.target.matches(".delete-gallery-btn")
    ) {
        closeModal() 
    }
}, true
)

function closeModal() {
    editingModal.style.display="none"
}