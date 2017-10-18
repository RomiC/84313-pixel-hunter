import getElementFromTemplate from '../create-DOM.js';
import changeTemplate from '../change-template.js';
import greetingTemplate from './greeting.js';

const headerGameTemplate = (data) => {
  return `
   <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">${data.time}</h1>
    <div class="game__lives">
      ${new Array(3 - data.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      ${new Array(data.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    </div>
  </header>`;
};

const headerTemplate = `
  <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>`;

const element = (data, mode) => {
  if (mode) {
    const template = (mode === `game`) ? headerGameTemplate(data) : headerTemplate;
    const el = getElementFromTemplate(template);

    el.querySelector(`.back`).addEventListener(`click`, (event) => {
      event.preventDefault();
      changeTemplate(greetingTemplate);
    });
    return el;
  } else {
    return false;
  }
};

export default element;
