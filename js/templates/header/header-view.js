import AbstractView from '../../abstract-view.js';

export default class HeaderView extends AbstractView {
  constructor(mode, dataGame) {
    super();
    this._mode = mode;
    this._data = dataGame;
  }

  get template() {
    if (this._mode) {
      return (this._mode === `game`) ? this.headerGameTemplate : this.headerTemplate;
    } else {
      return false;
    }
  }

  get headerGameTemplate() {
    return `
    <header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      <h1 class="game__timer">${this._data.time}</h1>
      <div class="game__lives">
        ${new Array(3 - this._data.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
         ${new Array(this._data.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      </div>
     </header>`.trim();
  }

  get headerTemplate() {
    return `<header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
    </header>`.trim();
  }

  bind() {
    this._element.querySelector(`.back`).addEventListener(`click`, (event) => {
      event.preventDefault();
      this.showGreetingPage();
    });
  }

  showGreetingPage() {
  }
}
