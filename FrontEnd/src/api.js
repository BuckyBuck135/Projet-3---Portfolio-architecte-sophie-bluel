//////////////////// Importing helper functions and constants from index.js ////////////////////
import {renderModalGrid, renderAllWorks, clearForm, renderSuccessMessage, renderErrorMessage, createFormData } from '/src/index.js';
import { fileInput, titleInput, categoryInput, deleteMessage, uploadMessage} from '/src/index.js';


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
        renderSuccessMessage(deleteMessage, "Image(s) supprimée(s)", "top-3em")

    } catch (error) {
        console.log(error.message);
        renderErrorMessage(deleteMessage, "Erreur lors de la suppression", "top-3em")
    }
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
        renderSuccessMessage(uploadMessage, "Gallerie mise à jour", "top-3em")
        renderModalGrid();
        renderAllWorks();
        clearForm() 
    } 
    catch (error) {
        console.log(error.message);
        renderErrorMessage(uploadMessage, "Erreur lors de la mise à jour de la gallerie", "top-3em")
    }
}
