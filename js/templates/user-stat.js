import getElementFromTemplate from '../create-DOM.js';
import {RIGHT_ANSWER, FAST_ANSWER, SLOW_ANSWER, WRONG_ANSWER} from '../data/game-utility.js'

const userStat = (data) => {
  const stats = `
  <div class="stats">
      <ul class="stats">
        ${data.map((score) => {
          if (score === RIGHT_ANSWER) {
            return `<li class="stats__result stats__result--correct"></li>`
          } else if (score === FAST_ANSWER) {
            return `<li class="stats__result stats__result--fast"></li>`
          } else if (score === SLOW_ANSWER) {
            return `<li class="stats__result stats__result--slow"></li>`
          } else if (score === WRONG_ANSWER) {
            return `<li class="stats__result stats__result--wrong"></li>`
          }
        }).join(``)}
        ${new Array(10 - data.length).fill(`<li class="stats__result stats__result--unknown"></li>`)}
      </ul>
    </div>`;

  return getElementFromTemplate(stats);
};

export default userStat;


