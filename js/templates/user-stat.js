import getElementFromTemplate from '../create-DOM.js';
import {ANSWERS} from '../data/constants.js';

const resultLevel = (type) => {
  if (type === ANSWERS.RIGHT) {
    return `<li class="stats__result stats__result--correct"></li>`;
  } else if (type === ANSWERS.FAST) {
    return `<li class="stats__result stats__result--fast"></li>`;
  } else if (type === ANSWERS.SLOW) {
    return `<li class="stats__result stats__result--slow"></li>`;
  } else if (type === ANSWERS.WRONG) {
    return `<li class="stats__result stats__result--wrong"></li>`;
  }

  return ``;
};

export const userStat = (data) => {
  return `
  <div class="stats">
    <ul class="stats">
      ${data.map((score) => resultLevel(score)).join(``)}
      ${new Array(10 - data.length).fill(`<li class="stats__result stats__result--unknown"></li>`)}
    </ul>
  </div>`;
};


