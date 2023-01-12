
// Constants
const galleryEl = document.getElementById("gallery")
const allWorksBtn = document.getElementById("all-works")
const objectsWorksBtn = document.getElementById("objects-works")
const apartmentsWorksBtn = document.getElementById("apartments-works")
const hotelsWorksBtn = document.getElementById("hotels-works")
const editDivs = document.getElementsByClassName("edit-div")


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

// // Render all Works - OLD VERSION
// async function renderAllWorks() {
//     const works = await fetchApi();
//     for (let i=0; i<works.length; i++) {
//         const figure = document.createElement("figure")
//         figure.innerHTML = `
//             <img src="${works[i].imageUrl}" alt="${works[i].title}" crossorigin="anonymous">
//             <figcaption>${works[i].title}</figcaption>
//         `
//         galleryEl.appendChild(figure)
//     }
// }

// Render all Works
async function renderAllWorks() {
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


// // Render filtered Works - OLD VERSION
// async function renderFilteredWorks(category) {
//     const works = await fetchApi();
//     for (let i=0; i<works.length; i++) {
//         //checks category property
//             if(works[i].categoryId === category) {
//                 const figure = document.createElement("figure")
//                 figure.innerHTML = `
//                     <img src="${works[i].imageUrl}" alt="${works[i].title}" crossorigin="anonymous">
//                     <figcaption>${works[i].title}</figcaption>
//                 `
//                 galleryEl.appendChild(figure)
//             }
//     }
// }

// Render filtered Works
async function renderFilteredWorks(category) {
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
    galleryEl.innerHTML = ""
    renderAllWorks()
})

objectsWorksBtn.addEventListener("click", function() {
    galleryEl.innerHTML = ""
    renderFilteredWorks(1)
})

apartmentsWorksBtn.addEventListener("click", function() {
    galleryEl.innerHTML = ""
    renderFilteredWorks(2)
})

hotelsWorksBtn.addEventListener("click", function() {
    galleryEl.innerHTML = ""
    renderFilteredWorks(3)
})


//////////////////// END OF HOME PAGE PORTFOLIO ////////////////////


// Submits contact form //
const contactForm = document.getElementById("contact-form")
contactForm.addEventListener("submit", function(e) {
    e.preventDefault()
})

// User log in //
let isLoggedIn = true;
if (isLoggedIn) {
    for (let i = 0; i<editDivs.length; i++) {
        editDivs[i].style.display = "flex"
    }
    
}