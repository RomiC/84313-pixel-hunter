import {resizeImages} from '../../data/game-utility.js';
import AbstractView from '../../abstract-view.js';

export default class Level3ImgsView extends AbstractView {
  constructor(levelData) {
    super();
    this._level = levelData;
    const amountTypePainting = levelData.answers.filter((answer) => answer.type === `painting`).length;
    this._level.typeAnswer = (amountTypePainting === 1) ? `painting` : `photo`;
  }

  get titleLevel() {
    return (this._level.typeAnswer === `painting`) ? `Найдите рисунок среди изображений` : `Найдите фото среди изображений`;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${ this.titleLevel }</p>
      <form class="game__content  game__content--triple">
        ${this._level.answers.map((option) => `<div class="game__option">
            <img src="${option.image.url}" alt="${option.type}" width="${option.image.width}" height="${option.image.height}">
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
        const isCorrectAnswer = ev.target.lastElementChild.alt === this._level.typeAnswer;
        this.showNextLevel(isCorrectAnswer);
      });
    });

  }

  showNextLevel() {
  }
}
