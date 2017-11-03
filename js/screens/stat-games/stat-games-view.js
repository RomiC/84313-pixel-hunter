import AbstractView from '../../abstract-view.js';
import {countFinalScores} from '../../data/game-utility.js';
import {ANSWERS, ANSWER_SCORES, GAME} from '../../data/constants.js';
import userStat from '../../templates/user-stat/user-stat.js';


const getAmountTypeAnswer = (dataGame, typeAnswer) => {
  return dataGame.filter((score) => score === typeAnswer).length;
};

const getDetailScores = (dataGame, typeAnswer, typeAnswerScore) => {
  return getAmountTypeAnswer(dataGame, typeAnswer) * typeAnswerScore;
};

const getDetailCorrectScores = (dataGame) => {
  return dataGame.filter((score) => {
    return score === ANSWERS.FAST || score === ANSWERS.SLOW || score === ANSWERS.RIGHT;
  }).length * ANSWER_SCORES.RIGHT;
};

export default class StatGamesView extends AbstractView {
  constructor(userDataStats) {
    super();
    this._dataGames = userDataStats.reverse();
    this._statLastGame = this._dataGames[0].stats;
    this._lives = GAME.MAX_AMOUNT_LIVES - userDataStats.filter((value) => value === 0).length;
    this._finalScores = countFinalScores(this._statLastGame, this._lives);
  }

  get template() {
    return `
      <div class="result">
        ${ this.titleStat }
        ${ this._dataGames.map((game, i) => this.getResultGame(i + 1)).join(``)}
      </div>`.trim();
  }

  get titleStat() {
    return (this._finalScores === GAME.FAIL) ? `<h1>Поражение!</h1>` : `<h1>Победа!</h1>`;
  }

  getResultGame(indexGame) {
    const statUser = this._dataGames[indexGame - 1].stats;
    const finalScores = countFinalScores(statUser, this._lives);

    if (finalScores !== GAME.FAIL) {
      return `
      <table class="result__table">
          <tr>
            <td class="result__number">${indexGame}.</td>
            <td colspan="2">
              ${userStat(statUser).template}
            </td>
            <td class="result__points">×&nbsp;${ANSWER_SCORES.RIGHT}</td>
            <td class="result__total">
              ${getDetailCorrectScores(statUser)}
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
            <td class="result__extra">${this._lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;${ANSWER_SCORES.LIVE}</td>
            <td class="result__total">${this._lives * ANSWER_SCORES.LIVE}</td>
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
            ${userStat(statUser).template}
          </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
  }
}
