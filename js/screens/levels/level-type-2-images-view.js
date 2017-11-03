import {resizeImages} from '../../data/game-utility.js';
import AbstractView from '../../abstract-view.js';

export default class Level2ImgsView extends AbstractView {
  constructor(levelData) {
    super();
    this._level = levelData;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
      <form class="game__content">
        ${this._level.answers.map((option, i) => `<div class="game__option">
          <img src="${option.image.url}" alt="Option ${i + 1}" width="${option.image.width}" height="${option.image.height}">
          <label class="game__answer game__answer--photo">
            <input name="question${i + 1}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question${i + 1}" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>`).join(``)}
      </form>
    </div>`.trim();
  }

  checkQuestion(a1, a2) {
    return this._level.answers[0].type === a1 && this._level.answers[1].type === a2;
  }

  bind() {
    const frameSize = {
      width: 468,
      height: 458
    };
    resizeImages(this._element, frameSize);

    const radioBtns = Array.prototype.slice.call(this._element.querySelectorAll(`input[type=radio]`));

    let q1 = false;
    let q2 = false;
    radioBtns.forEach((radioBtn) => {
      radioBtn.addEventListener(`change`, (ev) => {
        if (ev.target.name === `question1`) {
          q1 = ev.target.value;
        } else {
          q2 = ev.target.value;
        }

        if (q1 && q2) {
          const isCorrectAnswer = this.checkQuestion(q1, q2);
          this.showNextLevel(isCorrectAnswer);
        }
      });
    });

  }

  showNextLevel() {
  }
}
