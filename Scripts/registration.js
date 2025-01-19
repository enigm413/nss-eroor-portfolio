const inputEls = document.querySelectorAll(".need-validation");

const errorMessageList = {
  name: getNameErrorMessage,
  mail: getMailErrorMessage,
  age: getAgeErrorMessage,
  contact: getContactErrorMessage,
  address: getAddressErrorMessage,
  job: getJobErrorMessage,
  company: getCompanyErrorMessage,
};

function getNameErrorMessage(val, inputEl) {
  const nameVal = val.replace(/\s+/g, " ");
  const nameRegex = /[^a-z ]/gi;
  if (nameRegex.test(nameVal)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else if (nameVal.split(" ").length === 1) {
    return `Please Enter the full ${inputEl.id}!!!`;
  } else {
    return "";
  }
}

function getMailErrorMessage(val, inputEl) {
  const mailRegex = /^[a-z0-9](\.?[a-z0-9]){5,29}@gmail\.com$/gi;
  if (!mailRegex.test(val)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else {
    return "";
  }
}

function getAgeErrorMessage(val, inputEl) {
  const ageRegex = /^\d{1,2}$/g;
  if (!ageRegex.test(val)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else if (Number(val) < 18) {
    return "Minimum Age Requirement To Register is 18";
  } else {
    return "";
  }
}

function getContactErrorMessage(val, inputEl) {
  const ageRegex = /^\d{10}$/g;
  if (!ageRegex.test(val)) {
    return `Please Enter valid ${inputEl.id} number!!!`;
  } else {
    return "";
  }
}

function getJobErrorMessage(val, inputEl) {
  const jobVal = val.replace(/\s+/g, " ");
  const jobRegex = /[^a-z ]/gi;
  if (jobRegex.test(jobVal)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else {
    return "";
  }
}

function getCompanyErrorMessage(val, inputEl) {
  const companyVal = val.replace(/\s+/g, " ");
  const companyRegex = /^[a-z0-9\s]+$/gi;
  if (companyRegex.test(companyVal)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else {
    return "";
  }
}

function getAddressErrorMessage(val, inputEl) {
  const addressVal = val.replace(/\s+/g, " ");
  const addressRegex = /([a-z0-9]+,? ?\/?)+/gi;
  if (!addressRegex.test(addressVal)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else if (!/[\d{6}]/g.test(addressVal)) {
    return "Please Add Pincode along with address";
  } else {
    return "";
  }
}

function displayError(messageEl, message, chckError) {
  messageEl.textContent = message;
  messageEl.classList.toggle("visibility--visible", chckError);
}

function validateInput(val, inputEl, str) {
  //Remove All Unwanted Space
  const inputVal = val.trim();
  const errorMessageEl = inputEl.nextElementSibling;
  const errorMessage = errorMessageList[str](inputVal, inputEl);
  const isError = errorMessage !== "" ? true : false;
  displayError(errorMessageEl, errorMessage, isError);
}

// Handling Change Event Related To Names
inputEls.forEach((inputEl) => {
  inputEl.addEventListener("change", (event) => {
    const str = inputEl.id.split("-").slice(-1)[0];
    validateInput(event.target.value, inputEl, str);
  });
});

// Handling Change Event Related To Names
inputEls.forEach((inputEl) => {
  inputEl.addEventListener("input", (event) => {
    const inputVal = event.target.value;
    const errorMessageEl = inputEl.nextElementSibling;
    if (inputVal === "") {
      errorMessageEl.classList.remove("visibility--visible");
    }
  });
});
