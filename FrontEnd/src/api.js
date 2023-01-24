//////////////////// Importing helper functions and constants from index.js ////////////////////
import {renderModalGrid, renderAllWorks, clearForm } from '/src/index.js';
import { fileInput, titleInput, categoryInput } from '/src/index.js';

export async function getAllWorks() {
    try {
        const data = await fetch("http://localhost:5678/api/works");
        return data.json();
    } 
    catch (error) {
        return error;
    }
}


export async function deleteWorks(imageId) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (!res.ok) {
            throw new Error('Failed to delete resource');
        }
        if (res.status !== 204) {
            const data = await res.json();
            // Do something with the data
        }
        renderModalGrid();
        renderAllWorks();
    } catch (error) {
        console.log(error.message);
    }
}
// Before refactoring
// function deleteWorks(imageId) {
//     const token = localStorage.getItem("token") 
//     fetch("http://localhost:5678/api/works/" + imageId, {
//         method: 'DELETE',
//         headers: {
//             'Authorization': 'Bearer ' + token,
//             'Accept': 'application/json', 
//             'Content-Type': 'application/json'
//         }
//     })
//     .then(res => {
//         if (!res.ok) {
//           throw new Error('Failed to delete resource');
//         }
//         // checks if the API sends data back; if so, return it.
//         if(res.status !== 204) {
//             return res.json();
//         }
//     })
//     .then(data => {
//         renderModalGrid()
//         renderAllWorks()
//     })
//     .catch(error => {
//             console.log(error.message);
//     })
// }



export async function postUploadForm() {
    let formData = new FormData();
    formData.append('image', fileInput.files[0]);
    formData.append('title', titleInput.value)
    formData.append('category', categoryInput.value)
    try {

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5678/api/works", {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                // 'Content-Type': 'multipart/form-data'
            }
        });
        if (!res.ok) {
            throw new Error('Failed to upload resource');
        }
        // if (res.status !== 204) {
            const data = await res.json();
            console.log(data)
            // Do something with the data
        // }
        renderModalGrid();
        renderAllWorks();
        clearForm() 
        
    } 
    catch (error) {
        console.log(error.message);
    }
    console.log(fileInput.value)

}
