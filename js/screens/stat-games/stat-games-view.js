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
    this._finalScores = [];

    this._dataGames.forEach((game) => {
      const stats = game.stats;
      game.lives = GAME.MAX_AMOUNT_LIVES - stats.filter((value) => value === 0).length;
      const finalScore = countFinalScores(stats, game.lives);
      this._finalScores.push(finalScore);
    });
  }

  get template() {
    return `
      <div class="result">
        ${ this.titleStat }<br>
        ${ this.subtitleBetter }<br>
        ${ this._dataGames.map((game, i) => this.getResultGame(i + 1)).join(``)}
      </div>`.trim();
  }

  get titleStat() {
    return (this._finalScores[0] === GAME.FAIL) ? `<h1>Поражение!</h1>` : `<h1>Победа!</h1>`;
  }

  get subtitleBetter() {
    const resultBetterOther = this._finalScores.filter((value) => this._finalScores[0] > value).length;
    const amountWorthResult = resultBetterOther / (this._finalScores.length - 1);
    return (this._dataGames.length > 1 && this._finalScores[0] !== GAME.FAIL) ? `<p>Ваш текущий результат лучше ${Math.round(amountWorthResult * 100)}% предыдущих</p>` : ``;
  }

  getResultGame(indexGame) {
    const game = this._dataGames[indexGame - 1];
    const statUser = game.stats;
    const livesUser = game.lives;
    const finalScores = countFinalScores(statUser, livesUser);

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
            <td class="result__extra">${livesUser}&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;${ANSWER_SCORES.LIVE}</td>
            <td class="result__total">${livesUser * ANSWER_SCORES.LIVE}</td>
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
