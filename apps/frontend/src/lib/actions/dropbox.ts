"use server"

import { BACKEND_URL } from "@/lib/config";


const createFolder = async (formData: FormData)   => {
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