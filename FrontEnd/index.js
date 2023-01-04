
// Constants
const galleryEl = document.getElementById("gallery")
const allWorksBtn = document.getElementById("all-works")
const objectsWorksBtn = document.getElementById("objects-works")
const apartmentsWorksBtn = document.getElementById("apartments-works")
const hotelsWorksBtn = document.getElementById("hotels-works")

//Fetch all Works and renders gallery portfolio//
function fetchGallery() {
    fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
    })
    .then(function(value) {
        //renders the works
        for (let i=0; i<value.length; i++) {
            const figure = document.createElement("figure")
            figure.innerHTML = `
                <img src="${value[i].imageUrl}" alt="${value[i].title}" crossorigin="anonymous">
                <figcaption>${value[i].title}</figcaption>
            `
            galleryEl.appendChild(figure)
        }
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
}

//Fetch Objects Works and renders them//

function fetchObjectsWorks() {
    fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
    })
    .then(function(value) {
        //renders the works
        for (let i=0; i<value.length; i++) {
            //checks category property for OBJECTS (categoryId = 1)
            if(value[i].categoryId === 1) {
                const figure = document.createElement("figure")
                figure.innerHTML = `
                <img src="${value[i].imageUrl}" alt="${value[i].title}" crossorigin="anonymous">
                <figcaption>${value[i].title}</figcaption>
                `
                galleryEl.appendChild(figure)
            } 
        }
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
}

//Fetch Apartments Works and renders them//

function fetchApartmentsWorks() {
    fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
    })
    .then(function(value) {
        //renders the works
        for (let i=0; i<value.length; i++) {
            //checks category property for APARTMENTS (categoryId = 2)
            if(value[i].categoryId === 2) {
                const figure = document.createElement("figure")
                figure.innerHTML = `
                <img src="${value[i].imageUrl}" alt="${value[i].title}" crossorigin="anonymous">
                <figcaption>${value[i].title}</figcaption>
                `
                galleryEl.appendChild(figure)
            } 
        }
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
}

function fetchHotelsWorks() {
    fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
    })
    .then(function(value) {
        //renders the works
        for (let i=0; i<value.length; i++) {
            //checks category property for HOTELS (categoryId = 3)
            if(value[i].categoryId === 3) {
                const figure = document.createElement("figure")
                figure.innerHTML = `
                <img src="${value[i].imageUrl}" alt="${value[i].title}" crossorigin="anonymous">
                <figcaption>${value[i].title}</figcaption>
                `
                galleryEl.appendChild(figure)
            } 
        }
    })
    .catch(function(err) {
        // Une erreur est survenue
    });
}

// Event listeners for Filter buttons
allWorksBtn.addEventListener("click", function() {
    galleryEl.innerHTML = ""
    fetchGallery()
})

objectsWorksBtn.addEventListener("click", function() {
    galleryEl.innerHTML = ""
    fetchObjectsWorks()
})

apartmentsWorksBtn.addEventListener("click", function() {
    galleryEl.innerHTML = ""
    fetchApartmentsWorks()
})

hotelsWorksBtn.addEventListener("click", function() {
    galleryEl.innerHTML = ""
    fetchHotelsWorks()
})

// Renders all works on load
// fetchGallery()

///////////////////////////////////////////
// TRYING TO REFACTOR THE FETCH FUNCTION //
///////////////////////////////////////////

// let worksObject;
// function fetchWorks() {
//     fetch("http://localhost:5678/api/works")
//     .then(function(res) {
//         if (res.ok) {
//             let worksObject = res.json();
//             return worksObject;
//         }
//     })
// }
// console.log(fetchWorks())


/////////////////////////////////////////////////////////////////////////////////////////////

// // api url
// const api_url = 
//       "http://localhost:5678/api/works";
  
// // Defining async function
// async function getapi(url) {
    
//     // Storing response
//     const response = await fetch(url);
    
//     // Storing data in form of JSON
//     let works = await response.json();
//     console.log(works);
//     // if (response) {
//     //     hideloader();
//     // }
//     renderPortfolio(works);
// }
// // Calling that async function
// getapi(api_url);





// function renderPortfolio(data) {
//     for (let i=0; i<data.length; i++) {
//         const figure = document.createElement("figure")
//         figure.innerHTML = `
//             <img src="${data[i].imageUrl}" alt="${data[i].title}">
//             <figcaption>${data[i].title}</figcaption>
//         `
//         galleryEl.appendChild(figure)
// }}
// renderPortfolio()

//////////////////////////////////////////////////////////////////////////////////////////

// // Fetch categories and function to filter works
// function fetchCategories() {
//     fetch("http://localhost:5678/api/categories")
//       .then(function(res) {
//       if (res.ok) {
//         return res.json() ;
//       }
//     })
//     .then(function(value) {
//       // checks the value of the returned json  
//       console.log(value); 
//       //   const helloResult = document.getElementById("hello-result")
//       //   helloResult.innerHTML = value.queryString.greetings
//     })
//     .catch(function(err) {
//       // Une erreur est survenue
//     });
//   }
//   fetchCategories()
























// Submits contact form //
const contactForm = document.getElementById("contact-form")
contactForm.addEventListener("submit", function(e) {
    e.preventDefault()
})