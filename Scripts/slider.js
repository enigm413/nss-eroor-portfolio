// Define neccessary DOM elements
const profileCardsEl = document.querySelectorAll(".profile-cards");
const leftBtnEl = document.querySelectorAll(".left-btn");
const rightBtnEl = document.querySelectorAll(".right-btn");

const screenWidth = screen.width;
const sliderList = [
  {
    team: "Executive Committee",
    membersEl: getTargetEl([...profileCardsEl], "executive"),
    startPos: 0,
    endPos: getEndPos(screenWidth),
    leftBtnEl: getTargetEl([...leftBtnEl], "executive"),
    rightBtnEl: getTargetEl([...rightBtnEl], "executive"),
  },

  {
    team: "Vanitha Samajam Committee",
    startPos: 0,
    endPos: getEndPos(screenWidth),
    membersEl: getTargetEl([...profileCardsEl], "vanitha"),
    leftBtnEl: getTargetEl([...leftBtnEl], "vanitha"),
    rightBtnEl: getTargetEl([...rightBtnEl], "vanitha"),
  },
  {
    team: "Regional Committee",
    startPos: 0,
    endPos: getEndPos(screenWidth),
    membersEl: getTargetEl([...profileCardsEl], "regional"),
    leftBtnEl: getTargetEl([...leftBtnEl], "regional"),
    rightBtnEl: getTargetEl([...rightBtnEl], "regional"),
  },
  {
    team: "Bala Samajam Committee",
    startPos: 0,
    endPos: getEndPos(screenWidth),
    membersEl: getTargetEl([...profileCardsEl], "bala"),
    leftBtnEl: getTargetEl([...leftBtnEl], "bala"),
    rightBtnEl: getTargetEl([...rightBtnEl], "bala"),
  },
];

// Function To get end POsition of Sliders
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

//Function To get Target Element
function getTargetEl(element, str) {
  const targetEl = element.find((val) => {
    return val.id.split("-")[0] === str;
  });
  return targetEl;
}

//Function to get the team Members Data
async function getTeamMembersData() {
  const respone = await fetch("Data/teamMembersData.json");

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
function checkActiveBtn(slider, sliderData) {
  slider.leftBtnEl.classList.toggle("display--none", slider.startPos === 0);
  slider.rightBtnEl.classList.toggle(
    "display--none",
    slider.endPos === sliderData.length
  );
}

// Function to render single slider
async function renderSlider(slider) {
  let activeProfileData = "";
  const sliderData = await getSliderData(slider.team);
  checkActiveBtn(slider, sliderData);
  sliderData.slice(slider.startPos, slider.endPos).forEach((val) => {
    activeProfileData += getProfileCardTemplate(val);
  });
  slider.membersEl.innerHTML = activeProfileData;
}

// Function To render all the slider
function renderSliders() {
  sliderList.forEach((item) => {
    renderSlider(item);
  });
}

// Handling Click Event of Right Button In SLider
rightBtnEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    const str = btn.id.split("-")[0];
    const sliderObj = sliderList.find((val) => {
      return val.team.toLowerCase().includes(str);
    });
    sliderObj.startPos++;
    sliderObj.endPos++;
    renderSliders(sliderObj);
  });
});

// Handling Click Event of Left Button In SLider
leftBtnEl.forEach((btn) => {
  btn.addEventListener("click", () => {
    const str = btn.id.split("-")[0];
    const sliderObj = sliderList.find((val) => {
      return val.team.toLowerCase().includes(str);
    });
    sliderObj.startPos--;
    sliderObj.endPos--;
    renderSliders(sliderObj);
  });
});

renderSliders();
