// Define neccessary DOM elements
const textInputEls = document.querySelectorAll(".text-validation");
const fileInputEls = document.querySelectorAll(".file-validation");
const requiredInputEls = document.querySelectorAll("[required]");
const userRegFormEl = document.querySelector(".user-reg-form");
const submitBtnEl = document.querySelector(".submit-btn");
const errorMessageList = {
  name: getNameErrorMessage,
  mail: getMailErrorMessage,
  age: getAgeErrorMessage,
  contact: getContactErrorMessage,
  address: getAddressErrorMessage,
  job: getJobErrorMessage,
  company: getCompanyErrorMessage,
  photo: getPhotoErrorMessage,
  letter: getLetterErrorMessage,
};

//Function To Get Name Error Message
function getNameErrorMessage(nameVal, inputEl) {
  const nameRegex = /[^a-z ]/gi;
  if (nameRegex.test(nameVal)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else if (nameVal.split(" ").length === 1) {
    return `Please Enter the full ${inputEl.id}!!!`;
  } else {
    return "";
  }
}

//Function To Get Mail Error Message
function getMailErrorMessage(mailVal, inputEl) {
  const mailRegex = /^[a-z0-9](\.?[a-z0-9]){5,29}@gmail\.com$/gi;
  if (!mailRegex.test(mailVal)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else {
    return "";
  }
}

//Function To Get Age Error Message
function getAgeErrorMessage(ageVal, inputEl) {
  const ageRegex = /^\d{1,2}$/g;
  if (!ageRegex.test(ageVal)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else if (Number(ageVal) < 18) {
    return "Minimum Age Requirement To Register is 18";
  } else {
    return "";
  }
}

//Function To Get Contact Error Message
function getContactErrorMessage(contactVal, inputEl) {
  const contactRegex = /^\d{10}$/g;
  if (!contactRegex.test(contactVal)) {
    return `Please Enter valid ${inputEl.id} number!!!`;
  } else {
    return "";
  }
}

//Function To Get Job Error Message
function getJobErrorMessage(jobVal, inputEl) {
  const jobRegex = /[^a-z ]/gi;
  if (jobRegex.test(jobVal)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else {
    return "";
  }
}

//Function To Get Name Error Message
function getCompanyErrorMessage(companyVal, inputEl) {
  const companyRegex = /[^a-z0-9\s]+$/gi;
  if (companyRegex.test(companyVal)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else {
    return "";
  }
}

//Function To Get Address Error Message
function getAddressErrorMessage(addressVal, inputEl) {
  const addressRegex = /([a-z0-9]+,? ?\/?)+/gi;
  if (!addressRegex.test(addressVal)) {
    return `Please Enter valid ${inputEl.id}!!!`;
  } else if (!/[\d{6}]/g.test(addressVal)) {
    return "Please Add Pincode along with address";
  } else {
    return "";
  }
}

//Function To Get Letter Error Message
function getLetterErrorMessage(val, inputEl) {
  const fileType = val.type;
  const fileSize = val.size;
  if (fileType !== "application/msword" && fileType !== "application/pdf") {
    return "The acknowledgement letter should be in PDF or DOC format";
  } else if (fileSize > 1024 * 1024 * 2) {
    return "File is too large (Max Size : 2Mb)";
  } else {
    return "";
  }
}

//Function To Get Photo Error Message
function getPhotoErrorMessage(val, inputEl) {
  const fileType = val.type;
  const fileSize = val.size;
  if (fileType !== "image/jpeg" && fileType !== "image/png") {
    return "The acknowledgement letter should be in PDF or DOC format";
  } else if (fileSize > 1024 * 100) {
    return "File is too large (Max Size : 2Mb)";
  } else {
    return "";
  }
}

//Function To Display Error Message
function displayError(messageEl, message, chckError) {
  messageEl.textContent = message;
  messageEl.classList.toggle("visibility--visible", chckError);
}

function disableSubmitBtn(chckError) {
  submitBtnEl.disabled = chckError ? true : false;
  submitBtnEl.classList.toggle("disabled-btn", chckError);
}

//Function To Validate Inputs
function validateInput(val, inputEl, str) {
  const inputVal =
    typeof val === "string" ? val.trim().replace(/\s+/g, " ") : val;
  const errorMessageEl = inputEl.nextElementSibling;
  const errorMessage = errorMessageList[str](inputVal, inputEl);
  const isError = errorMessage !== "" ? true : false;
  displayError(errorMessageEl, errorMessage, isError);
  disableSubmitBtn(isError);
}

//Function To Validate Empty Inputs
function validateEmptyInput(inputEl) {
  const errorMessageEl = inputEl.nextElementSibling;
  const errorMessage = "This field should not be empty";
  const isError = errorMessage !== "" ? true : false;
  inputEl.previousElementSibling.scrollIntoView({ block: "center" });
  displayError(errorMessageEl, errorMessage, isError);
  disableSubmitBtn(isError);
}

// Handling Change Event Related To All Text Input Elements
textInputEls.forEach((inputEl) => {
  inputEl.addEventListener("change", (event) => {
    const str = inputEl.id.split("-").slice(-1)[0];
    validateInput(event.target.value, inputEl, str);
  });
});

// Handling Change Event Related To ALl Text Input Elements
textInputEls.forEach((inputEl) => {
  inputEl.addEventListener("input", (event) => {
    const inputVal = event.target.value;
    const errorMessageEl = inputEl.nextElementSibling;
    errorMessageEl.classList.remove("visibility--visible");
    disableSubmitBtn(false);
  });
});

// Handling Change Event Related To All File Input Elements
fileInputEls.forEach((inputEl) => {
  inputEl.addEventListener("change", (event) => {
    const str = inputEl.id.split("-").slice(-1)[0];
    validateInput(event.target.files[0], inputEl, str);
  });
});

userRegFormEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const emptyInpultEls = [...requiredInputEls].filter((inputEl) => {
    return inputEl.value === "";
  });

  validateEmptyInput(emptyInpultEls[0]);
});
