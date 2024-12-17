// Define neccessary DOM element
const galleryEl = document.querySelector(".gallery");

async function getGalleryImageList() {
  const response = await fetch("../Data/gallery.json");
  const data = await response.json();
  return data;
}

// Function To get the journey Item Template
function getGalleryItemTemplate(galleryItem) {
  const galleryItemTemplate = `
  <li class="gallery-image-wrapper">
    <img
      src="../Images/Gallery/${galleryItem.imageFileName}"
      alt="${galleryItem.imageFileName}"
      class="gallery-image"
    />
  </li>`;
  return galleryItemTemplate;
}

export async function renderGaleryImageList() {
  let galleryImageList = "";
  const galleryData = await getGalleryImageList();
  galleryData.forEach((val) => {
    galleryImageList += getGalleryItemTemplate(val);
  });
  galleryEl.innerHTML = galleryImageList;
}
