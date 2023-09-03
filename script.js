const multiStepForm = document.querySelector("form[data-multi-step]");
const formSteps = [...document.querySelectorAll("div[data-step]")];

const multiStepLink = document.querySelector(
  "#navbar .nav-container[data-multi-step]"
);
const linkSteps = [...document.querySelectorAll("#navbar .link[data-step]")];

let currPercentage = 0;
const percentage = document.querySelector(".progress-section .percentage");

window.addEventListener("load", () => {
  percentage.textContent = `${currPercentage}%`;
});

// For forms
let currentFormStep = formSteps.findIndex((step) =>
  step.classList.contains("active")
);

console.log(currentFormStep);

if (currentFormStep < 0) {
  currentFormStep = 0;
  showCurrentFormStep();
}

multiStepForm.addEventListener("click", (e) => {
  const progressBar = document.querySelector(".progress-section .progress-bar");
  const computedStyle = window.getComputedStyle(progressBar);
  const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;

  const percentage = document.querySelector(".progress-section .percentage");
  const percentageChange = parseInt(percentage.textContent);

  if (e.target.matches("[data-next]")) {
    currentFormStep += 1;
    currentLinkStep += 1;
    progressBar.style.setProperty("--width", width + 12.5);
    currPercentage = `${window
      .getComputedStyle(progressBar)
      .getPropertyValue("--width")}`;
    percentage.textContent = `${currPercentage}%`;
  } else if (e.target.matches("[data-prev]")) {
    currentFormStep -= 1;
    currentLinkStep -= 1;
    progressBar.style.setProperty("--width", width - 12.5);
    currPercentage = `${window
      .getComputedStyle(progressBar)
      .getPropertyValue("--width")}`;
    percentage.textContent = `${currPercentage}%`;
  } else {
    return;
  }

  console.log(currentFormStep);
  console.log(percentage.textContent);

  showCurrentFormStep();
  showCurrentLinkStep();
});

function showCurrentFormStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentFormStep);
  });
}

// For links
let currentLinkStep = linkSteps.findIndex((step) =>
  step.classList.contains("activate")
);

console.log(currentLinkStep);

if (currentLinkStep < 0) {
  currentLinkStep = 0;
  showCurrentLinkStep();
}

multiStepLink.addEventListener("click", (e) => {
  e.preventDefault();

  const targetElementIdx = parseInt(e.target.innerHTML) - 1;
  const parentElement = Array.from(
    document.getElementsByClassName(`${e.target.parentElement.className}`)
  );
  const childrenElement = [...parentElement[0].children];

  const progressBar = document.querySelector(".progress-section .progress-bar");
  const computedStyle = window.getComputedStyle(progressBar);
  const width = parseFloat(computedStyle.getPropertyValue("--width")) || 0;

  const percentage = document.querySelector(".progress-section .percentage");

  childrenElement.forEach((el, idx) => {
    if (idx === targetElementIdx) {
      currentFormStep = targetElementIdx;
      currentLinkStep = targetElementIdx;
      progressBar.style.setProperty("--width", currentLinkStep * 12.5);
      currPercentage = `${window
        .getComputedStyle(progressBar)
        .getPropertyValue("--width")}`;
      percentage.textContent = `${currPercentage}%`;
    } else {
      return;
    }

    showCurrentFormStep();
    showCurrentLinkStep();
  });
});

function showCurrentLinkStep() {
  linkSteps.forEach((step, index) => {
    step.classList.toggle("activate", index === currentLinkStep);
  });
}
