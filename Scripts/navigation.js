// Define neccessary DOM elements
const menuBtnEl = document.querySelector(".menu-btn");
const menuIconEl = document.querySelector(".menu-icon");
const closeIconEl = document.querySelector(".close-icon");
const navLinksEl = document.querySelector(".nav-links");

// Handling Click Event On Menu Button
menuBtnEl.addEventListener("click", () => {
  navLinksEl.classList.toggle("display--flex");
  menuIconEl.classList.toggle("display--none");
  closeIconEl.classList.toggle("display--none");
});
