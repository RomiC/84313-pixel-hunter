import getElementFromTemplate from '../createDOM.js';
import changeTemplate from '../changeTemplate.js';
import greetingTemplate from './greeting.js';

const headerGameTemplate = `
   <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">NN</h1>
    <div class="game__lives">
      <img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
      <img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">
    </div>
  </header>`;

const headerTemplate = `
  <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>`;

const element = (mode) => {
  if (mode) {
    const template = (mode === `game`) ? headerGameTemplate : headerTemplate;
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
