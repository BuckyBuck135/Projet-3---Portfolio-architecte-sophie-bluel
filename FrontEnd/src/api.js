//////////////////// Importing helper functions from api.js ////////////////////
import {renderModalGrid, renderAllWorks } from '/src/index.js';
import {uploadFormEl} from '/src/index.js';


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
    try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5678/api/works", {
            method: 'POST',
            body: new FormData(uploadFormEl),
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data; boundary=${formData._boundary}'
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
    } 
    catch (error) {
        console.log(error.message);
    }
}