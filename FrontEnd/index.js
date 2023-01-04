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
            const galleryEl = document.getElementById("gallery")
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

fetchGallery()

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
