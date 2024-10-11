"use server"

import { BACKEND_URL } from "@/lib/config";

/**
 * Creates a folder in Dropbox.
 * 
 * @param {FormData} formData - The form data containing the folder name.
 * @returns {Promise<void>} - A promise that resolves when the folder is created.
 */
const createFolder = async (formData: FormData): Promise<void>   => {
    const folder_name = formData.get("folder_name") as string;
    console.log(folder_name);
    const response = await fetch(`${BACKEND_URL}/dropbox/create-folder`, {
        method: "POST",
        body: JSON.stringify({ folder_name: folder_name }),
    });
    if (response.ok) {
        const data = await response.json();
        console.log(data);
    }
}

export {createFolder};