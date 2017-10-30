import getElementFromTemplate from '../create-DOM.js';
import {userStat} from './user-stat.js';
import {countFinalScores} from '../data/game-utility.js';
import {ANSWERS, ANSWER_SCORES, FAIL_GAME} from '../data/constants.js';

const getAmountTypeAnswer = (dataGame, typeAnswer) => {
  return dataGame.filter((score) => score === typeAnswer).length;
};

const getDetailScores = (dataGame, typeAnswer, typeAnswerScore) => {
  return getAmountTypeAnswer(dataGame, typeAnswer) * typeAnswerScore;
};

const getResultGame = (statUser, indexGame, lives) => {
  const finalScores = countFinalScores(statUser, lives);

  if (finalScores !== FAIL_GAME) {
    return `
    <table class="result__table">
        <tr>
          <td class="result__number">${indexGame}.</td>
          <td colspan="2">
            ${userStat(statUser)}
          </td>
          <td class="result__points">×&nbsp;${ANSWER_SCORES.RIGHT}</td>
          <td class="result__total">
            ${getDetailScores(statUser, ANSWERS.RIGHT, ANSWER_SCORES.RIGHT)}
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">
            ${getAmountTypeAnswer(statUser, ANSWERS.FAST)}&nbsp;
            <span class="stats__result stats__result--fast"></span>
          </td>
          <td class="result__points">×&nbsp;${ANSWER_SCORES.FAST}</td>
          <td class="result__total">
            ${getDetailScores(statUser, ANSWERS.FAST, ANSWER_SCORES.FAST)}
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${ANSWER_SCORES.LIVE}</td>
          <td class="result__total">${lives * ANSWER_SCORES.LIVE}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">
            ${getAmountTypeAnswer(statUser, ANSWERS.SLOW)}&nbsp;
            <span class="stats__result stats__result--slow"></span>
          </td>
          <td class="result__points">×&nbsp;${ANSWER_SCORES.SLOW}</td>
          <td class="result__total">
            ${getDetailScores(statUser, ANSWERS.SLOW, ANSWER_SCORES.SLOW)}
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
            ${userStat(statUser)}
          </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
};

const getTitleStat = (stats, lives) => {
  const finalScores = countFinalScores(stats, lives);
  return (finalScores === FAIL_GAME) ? `<h1>Поражение!</h1>` : `<h1>Победа!</h1>`;
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
