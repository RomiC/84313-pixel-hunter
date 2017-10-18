import getElementFromTemplate from '../create-DOM.js';
import userStat from './user-stat.js';
import {RIGHT_ANSWER, FAST_ANSWER, SLOW_ANSWER, WRONG_ANSWER,
  RIGHT_ANSWER_SCORE, FAST_ANSWER_SCORE, SLOW_ANSWER_SCORE,
  LIVE_SCORE} from '../data/game-utility.js'

const statsTemplate = (allStatistic) => {
  return `<div class="result">
    <h1>Победа!</h1>
    ${allStatistic.map((data, i) => {
      return `<table class="result__table">
                <tr>
                  <td class="result__number">${i+1}.</td>
                        <td colspan="2">
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
              }).join(``)};
                ${new Array(10 - data.length).fill(`<li class="stats__result stats__result--unknown"></li>`)}
              </ul>
            </td>
            <td class="result__points">×&nbsp;${RIGHT_ANSWER_SCORE}</td>
            <td class="result__total">${RIGHT_ANSWER_SCORE * (data.filter((step) => {return step === RIGHT_ANSWER_SCORE}).length+1)}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${(data.filter((step) => {return step === FAST_ANSWER}).length+1)}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${(FAST_ANSWER - RIGHT_ANSWER) * (data.filter((step) => {return step === FAST_ANSWER}).length+1)}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">950</td>
      </tr>`
  }).join(``)}
  </div>`;
};

const element = (statisticGames) => {
  return getElementFromTemplate(statsTemplate(statisticGames));
};

export default element;
