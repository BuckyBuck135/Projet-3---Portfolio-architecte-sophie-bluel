
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
const uploadFormEl = document.getElementById("upload-form")
const uploadBtn = document.getElementById("upload-btn")
const outputDiv = document.getElementById("output-container");

export const fileInput = document.getElementById("upload-file-input");
export const titleInput = document.getElementById("title");
export const categoryInput = document.getElementById("categoryId");
export const deleteMessage = document.getElementById("delete-message")
export const uploadMessage = document.getElementById("upload-message")



// Importing functions from api.js
import { getAllWorks, deleteWorks, postUploadForm } from '/src/api.js';
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
const loginMessage = document.getElementById("login-message")

if (localStorage.getItem("token") !== null) {
    // displays the edit buttons across the page
    for (let i = 0; i<editDivs.length; i++) {
        editDivs[i].style.display = "flex"
    }
    renderSuccessMessage(loginMessage, "Authentification réussie", "top-5em")

    logoutBtn.textContent = "logout"

}  else {
    for (let i = 0; i<editDivs.length; i++) {
        editDivs[i].style.display = "none"
    }
    logoutBtn.textContent = "login"
}

logoutBtn.addEventListener("click", logOut)
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

// Close the editing modal on click on the X button OR outside of the editing modal 
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
    removeErrorMessage(deleteMessage)

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

export function renderSuccessMessage(element, message, position) {
    element.textContent = message
    element.classList.add("success", position);
    element.classList.add("elementToFadeInAndOut");
    setTimeout(function() {
        element.textContent = ""
        element.classList.remove("success");
        element.classList.remove("elementToFadeInAndOut");}
    , 4000);
}

export function renderErrorMessage(element, message, position) {
    element.textContent = message
    element.classList.add("error", position);
    element.classList.add("elementToFadeIn");
    // setTimeout(function() {
    //     element.textContent = ""
    //     element.classList.remove("error");
    //     element.classList.remove("elementToFadeInAndOut");}
    // , 4000);
}

 function removeErrorMessage(element) {
    element.textContent = ""
        element.classList.remove("error");
        element.classList.remove("elementToFadeIn")
 }

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
        deleteGalleryBtn.setAttribute("disabled", "true");
    } else {
        deleteGalleryBtn.removeAttribute("disabled");
    }
}
 
////////// ADDING A PICTURE - UPLOADING MODAL //////////

const uploadingModal = document.getElementById("uploading-modal")

// Open the uploading modal
const addPhotoBtn = document.getElementById("add-photo-btn")
addPhotoBtn.addEventListener("click", function() {
    editingModal.style.display = "none"
    uploadingModal.style.display = "flex"
    uploadBtn.setAttribute("disabled", true)
})

// Back to editing modal
const modalBack = document.getElementById("modal-back")
modalBack.addEventListener("click", function() {
    uploadingModal.style.display = "none"
    editingModal.style.display = "flex"
    removeErrorMessage(uploadMessage)
    clearForm()
})

// Close the uploading modal on click on the X button OR outside of the modal 
document.addEventListener("click", function(e) {
    const modalElements = [
        ".uploading-modal",
        ".edit-btn-wrapper",
        ".modal-back",
        ".upload-form",
        ".modal-header",
        ".upload-background",
        ".upload-file-output",
        ".uploader",
        ".upload-bg-img",
        ".upload-file-label",
        ".upload-file-input",
        ".upload-caption",
        ".upload-label",
        ".upload-input-field",
        ".upload-hr",
        ".add-photo-btn"
    ];
    // Checks whether the element clicked matches any of the elements in the modalElements array, if not it will call the closeModal function
    if (!modalElements.some(element => e.target.matches(element))) {
        closeUploadingModal();
    }
}, true);

function closeUploadingModal() {
    uploadingModal.style.display = "none"
    removeErrorMessage(uploadMessage)
    clearForm()
}

// manages the preview of the uploaded picture and the disabled state on the upload button
document.getElementById("upload-file-input").addEventListener("input", function(e) {
    const reader = new FileReader()
    reader.onload = function(){
        // dynamically adds an <img> tag into HTML
        outputDiv.innerHTML = `
        <img src=${reader.result} id="upload-file-output" class="upload-file-output" alt="Image téléchargée.">
        `
    }
    reader.readAsDataURL(e.target.files[0]);
    uploadBtn.removeAttribute("disabled")
    hideUploader()
});

function hideUploader() {
    document.getElementById("uploader").style.display = "none"
    document.getElementById("upload-background").classList.add("uploader-no-padding")
}

export function clearForm() {
    outputDiv.innerHTML = ""
    fileInput.value = ""
    titleInput.value = ""
    categoryInput.value = 0
    document.getElementById("uploader").style.display = "flex"
    document.getElementById("upload-background").classList.remove("uploader-no-padding")
}

// Submitting the add photo form and chaining checks until the data is posted.
uploadFormEl.addEventListener("submit", function(e) {
    e.preventDefault()
    checkFileExtension()
})

function checkFileExtension() {
    const fileName = document.getElementById("upload-file-input").value;
    // get the extension
    const extension = fileName.split('.').pop().toLowerCase();
    if (extension === "jpg" || extension === "jpeg" || extension === "png") {
        // check for filesize < 4Mo
        checkFileSize(4)
    } else {
        renderErrorMessage(uploadMessage, "Erreur : le fichier téléchargé doit être au format jpg ou png", "top-7em")
    }   
}

function checkFileSize(maxSize) {
    //convert the size in Mo
    const fileSize = (fileInput.files[0].size/1024/1024)
    if (fileSize <= maxSize) {
        checkFileName()
    } else {
        renderErrorMessage(uploadMessage, "Erreur : la taille du fichier téléchargé doit être inférieure à 4Mo", "top-7em")
    }  
}

function checkFileName() {
    if(titleInput.value) {
        checkCategory()
    } else {
        renderErrorMessage(uploadMessage, "Erreur : veuillez donner un titre à votre image", "top-7em")
    }
}

function checkCategory() {
    if (categoryInput.value != 0) {
        validateUploadForm()
    } else {
        renderErrorMessage(uploadMessage, "Erreur : veuillez choisir une catégorie", "top-7em")
    }
}

function validateUploadForm() {
    if (fileInput.value && titleInput.value && categoryInput.value) {
        postUploadForm()
    } else {
        renderErrorMessage(uploadMessage, "Une erreur est survenue", "top-7em")
    }
}

export function createFormData(fileInput, titleInput, categoryInput) {
    const uploadFormData = new FormData();
    uploadFormData.append('image', fileInput.files[0]);
    uploadFormData.append('title', titleInput.value)
    uploadFormData.append('category', categoryInput.value)
    return uploadFormData
}
