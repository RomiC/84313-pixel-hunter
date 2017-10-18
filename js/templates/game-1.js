import getElementFromTemplate from '../create-DOM.js';
import userStat from './user-stat.js';
import nextLevel from '../data/next-level.js';
import {copyOnWrite} from '../data/game-utility.js';

const game1Template = (data) => {
  return `
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${[...Object.entries(data.options)].map(([option], i) => `<div class="game__option">
        <img src="${data.options[option]}" alt="Option ${i+1}" width="468" height="458">
        <label class="game__answer game__answer--photo">
          <input name="question${i+1}" type="radio" value="photo">
            <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${i+1}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>`).join(``)}
    </form>
  </div>`;
};

const checkQuestion = (answers, a1, a2) => {
  return answers.question1 === a1 && answers.question2 === a2;
};

const element = (level, userDataGame) => {
  let el = getElementFromTemplate(game1Template(level));
  el.querySelector(`.game`).appendChild(userStat({}));

  const radioBtns = Array.prototype.slice.call(el.querySelectorAll(`input[type=radio]`));

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
        let newData = {};
        if (checkQuestion(level.answers, q1, q2)) {
          newData = {
            level: userDataGame.level + 1,
            stats: userDataGame.push(1)
          };
        } else {
          newData = {
            level: userDataGame.level + 1,
            lives: userDataGame.lives - 1,
            stats: userDataGame.stats.push(0)
          };
        }
        const dataGame = copyOnWrite(userDataGame, newData);
        nextLevel(dataGame);
      }
    });
  });

  return el;
};

export default element;
