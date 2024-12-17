// Importing necessary functions and value
import { renderJourneyList } from "./journey.js";
import { renderGaleryImageList } from "./gallery.js";

// Define neccessary DOM elements
const executiveMembersEl = document.querySelector("#executive-members");
const vanithaMembersEl = document.querySelector("#vanitha-members");
const regionalMembersEl = document.querySelector("#regional-members");
const balaMembersEl = document.querySelector("#bala-members");
const executiveLeftBtnEl = document.querySelector("#executive-left-btn");
const executiveRightBtnEl = document.querySelector("#executive-right-btn");
const vanithaLeftBtnEl = document.querySelector("#vanitha-left-btn");
const vanithaRightBtnEl = document.querySelector("#vanitha-right-btn");
const regionalLeftBtnEl = document.querySelector("#regional-left-btn");
const regionalRightBtnEl = document.querySelector("#regional-right-btn");
const balaLeftBtnEl = document.querySelector("#bala-left-btn");
const balaRightBtnEl = document.querySelector("#bala-right-btn");
const menuBtnEl = document.querySelector(".menu-btn");
const menuIconEl = document.querySelector(".menu-icon");
const closeIconEl = document.querySelector(".close-icon");
const navLinksEl = document.querySelector(".nav-links");

const screenWidth = screen.width;
let executiveStartPos = 0;
let vanithaStartPos = 0;
let regionalStartPos = 0;
let balaStartPos = 0;

let executiveEndPos = getEndPos(screenWidth);
let vanithaEndPos = getEndPos(screenWidth);
let regionalEndPos = getEndPos(screenWidth);
let balaEndPos = getEndPos(screenWidth);

function getEndPos(val) {
  if (val > 1340) {
    return 4;
  } else if (val <= 1340 && val > 960) {
    return 3;
  } else if (val <= 960 && val > 730) {
    return 2;
  } else {
    return 1;
  }
}

//Function to get the team Members Data
async function getTeamMembersData() {
  const respone = await fetch("../Data/teamMembersData.json");
  const data = await respone.json();
  return data;
}

//Function to get slider data
async function getSliderData(team) {
  const teamMembersData = await getTeamMembersData();
  const sliderData = teamMembersData.filter((val) => {
    return val.team === team;
  });
  return sliderData;
}

//Function to get profile card template
function getProfileCardTemplate(data) {
  const ProfileCardTemplate = `            
  <div class="profile-card">
    <div class="profile-image-wrapper">
      <img
        src="Images/Members/${data.imageFileName}"
        alt="${data.name}"
        class="profile-image"
        loading="lazy"
      />
    </div>

    <div class="profile-text-wrapper">
      <div>
        <p class="profile-name">${data.name}</p>
      </div>

      <div>
        <p class="profile-role">${data.role}</p>
        <a href="tel:+91${data.phoneNumber}" class="profile-contact">Contact Me</a>
      </div>
    </div>
  </div>`;

  return ProfileCardTemplate;
}

//Function to check Active Button
async function checkActiveBtn(
  startPos,
  endPos,
  sliderData,
  leftBtnEl,
  rightBtnEl
) {
  leftBtnEl.classList.toggle("display--none", startPos === 0);
  rightBtnEl.classList.toggle("display--none", endPos === sliderData.length);
}

async function renderSliders(
  team,
  startPos,
  endPos,
  membersEl,
  leftBtnEl,
  rightBtnEl
) {
  let activeProfileData = "";
  const sliderData = await getSliderData(team);
  checkActiveBtn(startPos, endPos, sliderData, leftBtnEl, rightBtnEl);
  sliderData.slice(startPos, endPos).forEach((val) => {
    activeProfileData += getProfileCardTemplate(val);
  });
  membersEl.innerHTML = activeProfileData;
}

// Executing All rendering Function
renderJourneyList();
renderGaleryImageList();
renderSliders(
  "Executive Committee",
  executiveStartPos,
  executiveEndPos,
  executiveMembersEl,
  executiveLeftBtnEl,
  executiveRightBtnEl
);

renderSliders(
  "Vanitha Samajam Committee",
  vanithaStartPos,
  vanithaEndPos,
  vanithaMembersEl,
  vanithaLeftBtnEl,
  vanithaRightBtnEl
);

renderSliders(
  "Regional Committee",
  regionalStartPos,
  regionalEndPos,
  regionalMembersEl,
  regionalLeftBtnEl,
  regionalRightBtnEl
);

renderSliders(
  "Bala Samajam Committee",
  balaStartPos,
  balaEndPos,
  balaMembersEl,
  balaLeftBtnEl,
  balaRightBtnEl
);

// Handling Right Button On Executive Slider
executiveRightBtnEl.addEventListener("click", () => {
  executiveStartPos++;
  executiveEndPos++;
  renderSliders(
    "Executive Committee",
    executiveStartPos,
    executiveEndPos,
    executiveMembersEl,
    executiveLeftBtnEl,
    executiveRightBtnEl
  );
});

// Handling Left Button On Executive Slider
executiveLeftBtnEl.addEventListener("click", () => {
  executiveStartPos--;
  executiveEndPos--;
  renderSliders(
    "Executive Committee",
    executiveStartPos,
    executiveEndPos,
    executiveMembersEl,
    executiveLeftBtnEl,
    executiveRightBtnEl
  );
});

// Handling Right Button On Vanitha Slider
vanithaRightBtnEl.addEventListener("click", () => {
  vanithaStartPos++;
  vanithaEndPos++;
  renderSliders(
    "Vanitha Samajam Committee",
    vanithaStartPos,
    vanithaEndPos,
    vanithaMembersEl,
    vanithaLeftBtnEl,
    vanithaRightBtnEl
  );
});

// Handling Left Button On Vanitha Slider
vanithaLeftBtnEl.addEventListener("click", () => {
  vanithaStartPos--;
  vanithaEndPos--;
  renderSliders(
    "Vanitha Samajam Committee",
    vanithaStartPos,
    vanithaEndPos,
    vanithaMembersEl,
    vanithaLeftBtnEl,
    vanithaRightBtnEl
  );
});

// Handling Right Button On Regional Slider
regionalRightBtnEl.addEventListener("click", () => {
  regionalStartPos++;
  regionalEndPos++;
  renderSliders(
    "Regional Committee",
    regionalStartPos,
    regionalEndPos,
    regionalMembersEl,
    regionalLeftBtnEl,
    regionalRightBtnEl
  );
});

// Handling Left Button On Regional Slider
regionalLeftBtnEl.addEventListener("click", () => {
  regionalStartPos--;
  regionalEndPos--;
  renderSliders(
    "Regional Committee",
    regionalStartPos,
    regionalEndPos,
    regionalMembersEl,
    regionalLeftBtnEl,
    regionalRightBtnEl
  );
});

// Handling Right Button On Bala Slider
balaRightBtnEl.addEventListener("click", () => {
  balaStartPos++;
  balaEndPos++;
  renderSliders(
    "Bala Samajam Committee",
    balaStartPos,
    balaEndPos,
    balaMembersEl,
    balaLeftBtnEl,
    balaRightBtnEl
  );
});

// Handling Left Button On Bala Slider
balaLeftBtnEl.addEventListener("click", () => {
  balaStartPos--;
  balaEndPos--;
  renderSliders(
    "Bala Samajam Committee",
    balaStartPos,
    balaEndPos,
    balaMembersEl,
    balaLeftBtnEl,
    balaRightBtnEl
  );
});

// Handling Menu Button On Navigation Bar
menuBtnEl.addEventListener("click", () => {
  navLinksEl.classList.toggle("display--flex");
  menuIconEl.classList.toggle("display--none");
  closeIconEl.classList.toggle("display--none");
});
