
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchPhotoFromPixabay, limit, page, input } from './js/pixabay-api';
import { renderPhotos, listOfPhotos } from './js/render-functions';

export const form = document.querySelector('.search-form');

const nextPageBtn = document.querySelector('.next-page-btn');
hideElement(nextPageBtn);
const preloader = document.querySelector('.loader');
hideElement(preloader);
let totalPages = 1;

window.onload = handleLoad;

form.addEventListener('submit', handleSendForm);
nextPageBtn.addEventListener('click', handleNextPage);

function handleSendForm(evt) {
    evt.preventDefault();
    listOfPhotos.innerHTML = "";
    const newInput = evt.target.elements.search.value.trim();
    if (newInput !== '') {
        page = 1;
        input = newInput;
        handleSubmit();
    } else {
        return iziToast.show({
            message: 'Please complete the field!',
            theme: 'dark',
            progressBarColor: '#FFFFFF',
            color: '#EF4040',
            position: 'topRight',
        });
    }
}

async function handleSubmit() {
    try {
        hideElement(nextPageBtn);
        showElement(preloader);
        if (page > totalPages) {
            return iziToast.error({
                theme: 'dark',
                progressBarColor: '#FFFFFF',
                color: '#EF4040',
                position: "topRight",
                message: "We're sorry, there are no more posts to load"
            });
        } else {
            const photoFromPixabay = await fetchPhotoFromPixabay();
            totalPages = Math.floor(photoFromPixabay.totalHits / limit);
            renderPhotos(photoFromPixabay.hits);
            const itemOfList = listOfPhotos.querySelector('.photos-list-item');
            const domRect = itemOfList.getBoundingClientRect();
            window.scrollBy({
                top: domRect.height * 2,
                behavior: "smooth",
            });
                showElement(nextPageBtn);
        }
    } catch (error) {
        console.log(error.name);
        iziToast.error({
            message: `${error.message}`,
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

function handleNextPage() {
    if (page < totalPages) {
        ++page;
        handleSubmit();    
    }
};


function showElement(element) {
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

