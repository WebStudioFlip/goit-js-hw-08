// Add imports above this line
import "simplelightbox/dist/simple-lightbox.min.css";
import '../sass/main.scss';
import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";


// Change code below this line
const galleryEl = document.querySelector(".gallery");
const galleryItemsHtml = galleryItems
  .map(
    (el) => `
    <div class="gallery__item">
<a class="gallery__link" href=${el.original}>
  <img
    class="gallery__image"
    src=${el.preview}
    data-source=${el.original}
    alt=${el.description}   
  />
</a>
</div>`
  )
  .join("");

galleryEl.insertAdjacentHTML("beforeend", galleryItemsHtml);

let gallery = new SimpleLightbox(".gallery a", {captionsData:"alt", captionDelay:250});
console.dir(gallery)