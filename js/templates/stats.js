import getElementFromTemplate from '../create-DOM.js';
import {getListStatsTemplate} from './user-stat.js';
import {countFinalScores,
  RIGHT_ANSWER, FAST_ANSWER, SLOW_ANSWER, LIVE_SCORE,
  RIGHT_ANSWER_SCORE, FAST_ANSWER_SCORE, SLOW_ANSWER_SCORE} from '../data/game-utility.js';

const getAmountTypeAnswer = (dataGame, typeAnswer) => {
  return dataGame.filter((score) => score === typeAnswer).length;
};

const getDetailScores = (dataGame, typeAnswer, typeAnswerScore) => {
  return getAmountTypeAnswer(dataGame, typeAnswer) * typeAnswerScore;
};

const getResultGame = (statUser, indexGame, lives) => {
  const finalScores = countFinalScores(statUser, lives);

  if (finalScores !== -1) {
    return `
    <table class="result__table">
        <tr>
          <td class="result__number">${indexGame}.</td>
          <td colspan="2">
            <ul class="stats">
              ${getListStatsTemplate(statUser)}
            </ul>
          </td>
          <td class="result__points">×&nbsp;${RIGHT_ANSWER_SCORE}</td>
          <td class="result__total">
            ${getDetailScores(statUser, RIGHT_ANSWER, RIGHT_ANSWER_SCORE)}
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">
            ${getAmountTypeAnswer(statUser, FAST_ANSWER)}&nbsp;
            <span class="stats__result stats__result--fast"></span>
          </td>
          <td class="result__points">×&nbsp;${FAST_ANSWER_SCORE}</td>
          <td class="result__total">
            ${getDetailScores(statUser, FAST_ANSWER, FAST_ANSWER_SCORE)}
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${LIVE_SCORE}</td>
          <td class="result__total">${lives * LIVE_SCORE}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">
            ${getAmountTypeAnswer(statUser, SLOW_ANSWER)}&nbsp;
            <span class="stats__result stats__result--slow"></span>
          </td>
          <td class="result__points">×&nbsp;${SLOW_ANSWER_SCORE}</td>
          <td class="result__total">
            ${getDetailScores(statUser, SLOW_ANSWER, SLOW_ANSWER_SCORE)}
          </td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">
            ${finalScores}
          </td>
        </tr>
      </table>`;
  }

  return `
    <table class="result__table">
      <tr>
        <td class="result__number">${indexGame}.</td>
          <td colspan="2">
            <ul class="stats">
              ${getListStatsTemplate(statUser)}
            </ul>
          </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
};

const getTitleStat = (stats, lives) => {
  const finalScores = countFinalScores(stats, lives);
  return (finalScores === -1) ? `<h1>Поражение!</h1>` : `<h1>Победа!</h1>`;
};

const statsTemplate = (dataGames) => {
  const element = `
  <div class="result">
    ${ getTitleStat(dataGames[0].stats, dataGames[0].lives) }
    ${ dataGames.map((game, i) => getResultGame(game.stats, i + 1, game.lives)).join(``)}
  </div>`;
  return getElementFromTemplate(element);
};

export default statsTemplate;
