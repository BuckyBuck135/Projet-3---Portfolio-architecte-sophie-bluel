// CONSTANTS //
const galleryEl = document.getElementById("gallery")

function fetchGallery() {
    fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function(value) {
        //renders the works
        for (let i=0; i<11; i++) {
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








// 0
// : 
// {id: 2, title: 'Appartement Paris V', imageUrl: 'http://localhost:5678/images/appartement-paris-v1651287270508.png', categoryId: 2, userId: 1, …}

// [2].title



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
