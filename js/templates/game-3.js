import getElementFromTemplate from '../create-DOM.js';
import userStat from './user-stat.js';
import nextLevel from '../data/next-level.js';
import {copyOnWrite} from '../data/game-utility.js';

const game3Template = (data) => {
  return `
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${[...data.options].map((option) => `<div class="game__option">
        <img src="${option}" alt="Option 1" width="304" height="455">
      </div>`).join(``)}
    </form>
  </div>`;
};

const element = (level, userDataGame) => {
  let el = getElementFromTemplate(game3Template(level));
  el.querySelector(`.game`).appendChild(userStat({}));

  const pictures = Array.prototype.slice.call(el.querySelectorAll(`.game__option`));

  pictures.forEach((pic) => {
    pic.addEventListener(`click`, () => {
      const dataGame = copyOnWrite(userDataGame, {
        level: userDataGame.level + 1
      });
      nextLevel(dataGame);
    });
  });

  return el;
};

export default element;
