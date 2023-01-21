
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
const deleteGalleryBtn = document.getElementById("delete-gallery-btn")

// Importing api functions from api.js
import { getAllWorks, deleteWorks } from '/src/api.js';

//////////////////// HOME PAGE PORTFOLIO ////////////////////

// Render all works by default
renderAllWorks()

// Render all Works
export async function renderAllWorks() {
    galleryEl.innerHTML = ""
    const works = await getAllWorks();
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
export async function renderFilteredWorks(category) {
    galleryEl.innerHTML = ""
    const works = await getAllWorks();
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


//////////////////// LOGGING IN/OUT ////////////////////

// Logging in

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

//////////////////// EDITING MODAL ////////////////////

// Display the modal on click
editGalleryBtn.addEventListener("click", function(e) {
    editingModal.style.display="flex"
    renderModalGrid()
})

// Close the modal on click on the X button OR outside of the modal 
document.addEventListener("click", function(e) {
    const modalElements = [
        ".editing-modal",
        ".modal-form",
        ".modal-grid",
        ".modal-header",
        ".modal-figure",
        ".grid-img",
        ".move-icon",
        ".delete-icon",
        ".modal-caption",
        ".modal-hr",
        ".add-photo-btn",
        ".delete-gallery-btn"
    ];
    // Checks whether the element clicked matches any of the elements in the modalElements array, if not it will call the closeModal function
    if (!modalElements.some(element => e.target.matches(element))) {
        closeModal();
    }
}, true); // true is the useCapture parameter of the eventListener. 
//It allows to activate the event at the beginning ("capture") rather than at the end("bubble"), when it would resolve in closing the window as soon as I click outside


function closeModal() {
    editingModal.style.display="none"
}

// Render all Works in a grid
export async function renderModalGrid() {
    const modalGrid = document.getElementById("modal-grid")
    document.getElementById("modal-grid").innerHTML = ""
    const works = await getAllWorks();
    let html = ""
    for (let work of works) {
        html += `
        <figure class="modal-figure">
            <img class="grid-img" id="${work.id}" src="${work.imageUrl}" alt="${work.title}" crossorigin="anonymous">
            <div class="icon-wrapper">
                <button  class="move-btn"><img data-move="${work.id}" src="assets/icons/move.png" class="move-icon" alt="Icône déplacer."></button>
                <button  class="delete-btn"><img data-delete="${work.id}" src="assets/icons/delete.png" class="delete-icon" alt="Icône poubelle."></button>
            </div>
			<button class="caption-btn"><figcaption class="modal-caption">éditer</figcaption></button>
        </figure>
        `
    }
    modalGrid.innerHTML = html
    hasData()
}

// Click listeners for grid icons
document.addEventListener("click", function(e) {
    if (e.target.dataset.delete) {
        handleDeleteClick(e.target.dataset.delete)
    }
    if (e.target.dataset.move) {
        handleMoveClick(e.target.dataset.move)
    }

})

function handleDeleteClick(imageId) {
    let text = "Etes-vous sur de vouloir supprimer cette image ?";
    if (confirm(text) == true) {
        deleteWorks(imageId)
    }
}
// Not implemented yet
// function handleMoveClick(imageId) {
// }


// Delete gallery on click: GET all works, pushes IDs into an array that is passed an argument to deleteWorks
deleteGalleryBtn.addEventListener("click", function() {
    let text = "Etes-vous sur de vouloir supprimer toutes les images ?";
    if (confirm(text) == true) {
        deleteGallery()
    }
})

async function deleteGallery() {
    let IdArray = []
    const works = await getAllWorks()
    // fills the array with IDs
    IdArray = works.map(work => work.id)
    // calls deleteWorks with the IDs in the array
    for (let i = 0; i<IdArray.length; i++) {
        deleteWorks(IdArray[i])
        hasData()
    }
}

// GET all Works, if empty, disables "delete" button.
async function hasData() {
    const works = await getAllWorks();
    if (works.length === 0) {
        deleteGalleryBtn.setAttribute("disabled", "");
    } else {
        deleteGalleryBtn.removeAttribute("disabled");
    }
}
 