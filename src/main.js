import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchPhotoFromPixabay } from './js/pixabay-api';
import { renderPhotos } from './js/render-functions';


const form = document.querySelector('.search-form');
export const inputSearch = form.elements.search;
const nextPageBtn = document.querySelector('.next-page-btn');
hideElement(nextPageBtn);
export const listOfPhotos = document.querySelector('.gallery');
export const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
});
export const preloader = document.querySelector('.loader');
hideElement(preloader);
export let page = 1;
export let limit = 15;
let totalPages = Number;
let input = '';
form.addEventListener('submit', handleSendForm);
nextPageBtn.addEventListener('click', handleNextPage)
async function handleSendForm(evt) {
    evt.preventDefault();
    listOfPhotos.innerHTML = "";
    const newInput = evt.target.elements.search.value.trim();
    if (newInput === '') {
        return iziToast.show({
            message: 'Please complete the field!',
            theme: 'dark',
            progressBarColor: '#FFFFFF',
            color: '#EF4040',
            position: 'topRight',
        });
    } else if (newInput !== input) {
        page = 1;
        input = newInput;
    } else {
        page += 1
    }
    try {
        const photoFromPixabay = await fetchPhotoFromPixabay();
        renderPhotos(photoFromPixabay.hits);
        totalPages = Math.ceil(photoFromPixabay.totalHits / limit);
        showElement(nextPageBtn);
    } catch (error) {
        console.log(error);
        iziToast.error({
            message: 'Sorry, an error occurred while loading. Please try again!',
            theme: 'dark',
            progressBarColor: '#FFFFFF',
            color: '#EF4040',
            position: 'topRight',
        });
    } finally {
        hideElement(preloader);
        handleLoad();
        form.reset();
    }
}
window.onload = handleLoad;
async function handleNextPage() {
    if (page > totalPages) {
        return iziToast.error({
            theme: 'dark',
            progressBarColor: '#FFFFFF',
            color: '#EF4040',
            position: "topRight",
            message: "We're sorry, there are no more posts to load"
        });
    }
    await handleSendForm();
}

export function showElement(element){
    element.classList.toggle('hidden');
    element.style.display = 'flex';
};
function hideElement(element) {
    element.classList.toggle('hidden');
    element.style.display = 'none';
};

function handleLoad() {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
};



