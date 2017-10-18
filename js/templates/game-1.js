import getElementFromTemplate from '../create-DOM.js';
import changeTemplate from '../change-template.js';
import game2Template from './game-2.js';
import userStat from './user-stat.js';

const game1Template = `
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 1" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
      <div class="game__option">
        <img src="http://placehold.it/468x458" alt="Option 2" width="468" height="458">
        <label class="game__answer  game__answer--photo">
          <input name="question2" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--paint">
          <input name="question2" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  </div>`;

let element = getElementFromTemplate(game1Template);
element.appendChild(userStat({}));

const radioBtns = Array.prototype.slice.call(element.querySelectorAll(`input[type=radio]`));

let q1 = false;
let q2 = false;
radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener(`change`, (ev) => {
    if (ev.target.name === `question1`) {
      q1 = true;
    } else {
      q2 = true;
    }

    if (q1 && q2) {
      changeTemplate(game2Template, `game`);
    }
  });
});

export default element;
