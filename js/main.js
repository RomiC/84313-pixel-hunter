const templates = document.querySelectorAll(`template`);
const mainScreen = document.querySelector(`main`);


const changeTemplate = (num) => {
  mainScreen.innerHTML = templates[num].innerHTML;
};

const numFirstScreen = 0;
changeTemplate(numFirstScreen);

const ARROW_RIGHT = 39;
const ARROW_LEFT = 37;

const indexLastTemplate = templates.length - 1;

let numCurrentScreen = 0;
document.addEventListener(`keydown`, (e) => {
  if (e.altKey && e.keyCode === ARROW_RIGHT) {
    numCurrentScreen = (numCurrentScreen === indexLastTemplate) ? numFirstScreen : numCurrentScreen + 1;
  } else if (e.altKey && e.keyCode === ARROW_LEFT) {
    numCurrentScreen = (numCurrentScreen === 0) ? indexLastTemplate : numCurrentScreen - 1;
  }
  changeTemplate(numCurrentScreen);
});
