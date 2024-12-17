// Define neccessary DOM element
const journeyListEl = document.querySelector(".journey-list-wrapper");

async function getJourneyData() {
  const response = await fetch("../Data/journeyData.json");
  const data = await response.json();
  return data;
}

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
        loading="lazy"
      />
    </div>
  </li>`;
  return journeyItemTemplate;
}

//Function To Render Journey List
export async function renderJourneyList() {
  let journeyList = "";
  const journeyData = await getJourneyData();
  journeyData.forEach((val) => {
    journeyList += getJourneyItemTemplate(val);
  });
  journeyListEl.innerHTML = journeyList;
}
