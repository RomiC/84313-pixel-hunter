import getElementFromTemplate from '../create-DOM.js';
import {userStat} from './user-stat.js';
import nextLevel from '../data/next-level.js';

const game2Template = (data) => {
  return `
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${data.options[0].question}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
  </div>`;
};

const element = (level, userDataGame) => {
  let el = getElementFromTemplate(game2Template(level));
  el.querySelector(`.game`).appendChild(userStat(userDataGame.stats));

  const radioBtns = Array.prototype.slice.call(el.querySelectorAll(`input[type=radio]`));

  radioBtns.forEach((radioBtn) => {
    radioBtn.addEventListener(`change`, (ev) => {
      const isCorrectAnswer = ev.target.value === level.options[0].answer;
      nextLevel(userDataGame, isCorrectAnswer);
    });
  });

  return el;
};

export default element;
