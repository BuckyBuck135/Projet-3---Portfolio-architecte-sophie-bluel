//////////////////// Importing helper functions and constants from index.js ////////////////////
import {renderModalGrid, renderAllWorks, clearForm, renderDeleteMessage } from '/src/index.js';
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
        //status 204 means "no content" and "no content" means "no res.json()", so we don't need to write the /const data = await res.json();/ line at all
        // if (res.status !== 204) {
        //     const data = await res.json();
        // }
        renderModalGrid();
        renderAllWorks();
        renderDeleteMessage()

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

function createFormData(fileInput, titleInput, categoryInput) {
    const uploadFormData = new FormData();
    uploadFormData.append('image', fileInput.files[0]);
    uploadFormData.append('title', titleInput.value)
    uploadFormData.append('category', categoryInput.value)
    return uploadFormData
}

export async function postUploadForm() {
    const uploadFormData = createFormData(fileInput, titleInput, categoryInput) 
    try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5678/api/works", {
            method: 'POST',
            body: uploadFormData,
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
            }
        });
        if (!res.ok) {
            throw new Error('Failed to upload resource');
        }
        const data = await res.json();
        renderModalGrid();
        renderAllWorks();
        clearForm() 
    } 
    catch (error) {
        console.log(error.message);
    }

}
