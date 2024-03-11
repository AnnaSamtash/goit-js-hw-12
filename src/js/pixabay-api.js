
import { inputSearch, showElement, page, limit, preloader } from '../main';
import axios from "axios";

export async function fetchPhotoFromPixabay() {
    const inputValueForForm = inputSearch.value.trim().split(',').join('+');
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
    showElement(preloader);
        return response.data;
}