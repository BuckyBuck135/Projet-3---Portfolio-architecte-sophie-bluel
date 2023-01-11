
// Constants
const galleryEl = document.getElementById("gallery")
const allWorksBtn = document.getElementById("all-works")
const objectsWorksBtn = document.getElementById("objects-works")
const apartmentsWorksBtn = document.getElementById("apartments-works")
const hotelsWorksBtn = document.getElementById("hotels-works")

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
    const works = await fetchApi();
    for (let i=0; i<works.length; i++) {
        const figure = document.createElement("figure")
        figure.innerHTML = `
            <img src="${works[i].imageUrl}" alt="${works[i].title}" crossorigin="anonymous">
            <figcaption>${works[i].title}</figcaption>
        `
        galleryEl.appendChild(figure)
    }
}

// Render filtered Works
async function renderFilteredWorks(category) {
    const works = await fetchApi();
    for (let i=0; i<works.length; i++) {
        //checks category property
            if(works[i].categoryId === category) {
                const figure = document.createElement("figure")
                figure.innerHTML = `
                    <img src="${works[i].imageUrl}" alt="${works[i].title}" crossorigin="anonymous">
                    <figcaption>${works[i].title}</figcaption>
                `
                galleryEl.appendChild(figure)
            }
    }
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