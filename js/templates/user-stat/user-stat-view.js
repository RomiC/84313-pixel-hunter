import {ANSWERS, GAME} from '../../data/constants.js';
import AbstractView from '../../abstract-view.js';

export default class UserStatView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return `<div class="stats">
    <ul class="stats">
      ${this._data.map((score) => this.getResultLevel(score)).join(``)}
      ${new Array(GAME.AMOUNT_GAME_LEVELS - this._data.length).fill(`<li class="stats__result stats__result--unknown"></li>`)}
    </ul>
  </div>`.trim();
  }

  getResultLevel(type) {
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
  }

  bind() {
  }
}

