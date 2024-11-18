import { journeyData } from "./data.js";

const journeyListEl = document.querySelector(".journey-list-wrapper");

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
  journeyData.map((val) => {
    journeyListEl.innerHTML += getJourneyItemTemplate(val);
  });
}

renderJourneyList();
