const templates = document.querySelectorAll(`template`);
const mainScreen = document.querySelector(`main`);


const changeTemplate = (num) => {
  mainScreen.innerHTML = templates[num].innerHTML;
};

const numFirstScreen = 0;
changeTemplate(numFirstScreen);

const ARROW_RIGHT = 39;
const ARROW_LEFT = 37;

const amountTemplates = templates.length - 1;

let numScreen = 0;
document.addEventListener(`keydown`, (e) => {
  if (e.altKey && e.keyCode === ARROW_RIGHT) {
    numScreen = (numScreen === amountTemplates) ? numFirstScreen : numScreen + 1;
  } else if (e.altKey && e.keyCode === ARROW_LEFT) {
    numScreen = (numScreen === 0) ? amountTemplates : numScreen - 1;
  }
  changeTemplate(numScreen);
});
