
import { inputSearch, page, limit, input } from '../main';
import axios from "axios";

export async function fetchPhotoFromPixabay() {
    let inputValueForForm;
    if (page === 1) {
        inputValueForForm = inputSearch.value.trim().split(' ').join('+');  
    } else {
        inputValueForForm = input.trim().split(' ').join('+');
    }
    console.log(inputValueForForm);
    const searchParams = new URLSearchParams({
        key: "42633759-4a44573e34755b4488adb4c1b",
        q: [inputValueForForm],
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: [page], 
        per_page: [limit]
    });
    const response = await axios.get(`https://pixabay.com/api/?${searchParams}`);
        return response.data;
}