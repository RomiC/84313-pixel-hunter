import {resizeImages} from '../../data/game-utility.js';
import AbstractView from '../../abstract-view.js';

export default class Level3ImgsView extends AbstractView {
  constructor(levelData) {
    super();
    this._level = levelData;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content  game__content--triple">
        ${[...this._level.options].map((option) => `<div class="game__option">
            <img src="${option}" alt="Option 1" width="304" height="455">
        </div>`).join(``)}
      </form>
    </div>`.trim();
  }

  bind() {
    const frameSize = {
      width: 304,
      height: 455
    };
    resizeImages(this._element, frameSize);

    const pictures = Array.prototype.slice.call(this._element.querySelectorAll(`.game__option`));

    pictures.forEach((pic) => {
      pic.addEventListener(`click`, (ev) => {
        this._isCorrectAnswer = ev.target.lastElementChild.src === this._level.answer;
        this.showNextLevel();
      });
    });

  }

  showNextLevel() {
  }
}
