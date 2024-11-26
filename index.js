import { journeyData, teamMembersData } from "./data.js";

const journeyListEl = document.querySelector(".journey-list-wrapper");
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

const sliders = [
  {
    membersEl: executiveMembersEl,
    leftBtnEl: executiveLeftBtnEl,
    rightBtnEl: executiveRightBtnEl,
    startPos: 0,
    endPos: 4,
    sliderData: teamMembersData.filter((val) => {
      return val.team === "Executive Committee";
    }),
  },

  {
    membersEl: vanithaMembersEl,
    leftBtnEl: vanithaLeftBtnEl,
    rightBtnEl: vanithaRightBtnEl,
    startPos: 0,
    endPos: 4,
    sliderData: teamMembersData.filter((val) => {
      return val.team === "Vanitha Samajam Committee";
    }),
  },

  {
    membersEl: regionalMembersEl,
    leftBtnEl: regionalLeftBtnEl,
    rightBtnEl: regionalRightBtnEl,
    startPos: 0,
    endPos: 4,
    sliderData: teamMembersData.filter((val) => {
      return val.team === "Regional Committee";
    }),
  },

  {
    membersEl: balaMembersEl,
    leftBtnEl: balaLeftBtnEl,
    rightBtnEl: balaRightBtnEl,
    startPos: 0,
    endPos: 4,
    sliderData: teamMembersData.filter((val) => {
      return val.team === "Bala Samajam Committee";
    }),
  },
];

//Define Slider Left Button
const slidersLeftBtns = sliders.map((val) => {
  return val.leftBtnEl;
});

// Define Slider Right Button
const slidersRightBtns = sliders.map((val) => {
  return val.rightBtnEl;
});

////////////////////////////////////////////////
/////////////// SECTION Journey ////////////////
////////////////////////////////////////////////

// Function To get the journey Item Template
function getJourneyItemTemplate(journeyItem) {
  const journeyItemTemplate = `
  <li class="journey-item-wrapper">
    <div class="journey-text-wrapper">
      <p class="journey-year">${journeyItem.year}</p>
      <p class="journey-title">${journeyItem.title}</p>
      <p class="journey-description">${journeyItem.description}</p>
    </div>

    <div class="journey-image-wrapper">
      <img
        src="Images/Journey/${journeyItem.imageFileName}"
        alt="${journeyItem.imageAlternateText}"
        class="journey-image"
      />
    </div>
  </li>`;
  return journeyItemTemplate;
}

//Function To Render Journey List
function renderJourneyList() {
  let journeyList = "";
  journeyData.forEach((val) => {
    journeyList += getJourneyItemTemplate(val);
  });
  journeyListEl.innerHTML = journeyList;
}

////////////////////////////////////////////////
/////////////// SECTION CONTACT ////////////////
////////////////////////////////////////////////

//Function to get profile card template
function getProfileCardTemplate(data) {
  const ProfileCardTemplate = `            
  <div class="profile-card">
    <div class="profile-image-wrapper">
      <img
        src="Images/Members/${data.imageFileName}"
        alt="${data.name}"
        class="profile-image"
      />
    </div>

    <div class="profile-text-wrapper">
      <p class="profile-name">${data.name}</p>
      <p class="profile-role">${data.role}</p>
      <a href="tel:+91${data.phoneNumber}" class="profile-contact">Contact Me</a>
    </div>
  </div>`;

  return ProfileCardTemplate;
}

//Function to check Active Button
function checkActiveBtn({ ...slider }) {
  slider.leftBtnEl.classList.toggle("display--none", slider.startPos === 0);
  slider.rightBtnEl.classList.toggle(
    "display--none",
    slider.endPos === slider.sliderData.length
  );
}

//Function To Render Active Profile Cards
function renderActiveProfileCards({ ...slider }) {
  let activeProfileData = "";
  checkActiveBtn({ ...slider });
  slider.sliderData.slice(slider.startPos, slider.endPos).map((val) => {
    activeProfileData += getProfileCardTemplate(val);
  });
  slider.membersEl.innerHTML = activeProfileData;
}

//Function To Render Slider
function renderSliders() {
  sliders.forEach((slider) => {
    renderActiveProfileCards({ ...slider });
  });
}

//Function To handle left button sliders
slidersLeftBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    sliders[index].startPos--;
    sliders[index].endPos--;
    renderActiveProfileCards(sliders[index]);
  });
});

//Function To handle right button sliders
slidersRightBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    sliders[index].startPos++;
    sliders[index].endPos++;
    renderActiveProfileCards(sliders[index]);
  });
});

renderJourneyList();
renderSliders();
