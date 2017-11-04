import {nextLevel, spendLives, setLastLevelStat, tick} from './game-utility.js';
import {initialGame} from './constants.js';
import {getData} from './game-load.js';
import {GAME} from './constants.js';

export default class GameModel {
  constructor(state = initialGame) {
    this._state = state;
  }

  nextLevel() {
    this.update(nextLevel(this._state));
  }

  spendLives() {
    this.update(spendLives(this._state));
  }

  setLastLevelStat(answer) {
    this.update(setLastLevelStat(this._state, answer));
  }

  getLevelData() {
    return this.questions && this.questions[this._state.level];
  }

  loadQuestionsData() {
    return getData(`questions`);
  }

  stopTimer() {
    this._state.time = initialGame.time;
    this.update(this._state);
  }

  userInGame() {
    return this._state.lives !== -1 && this._state.level < GAME.AMOUNT_GAME_LEVELS;
  }

  update(newState) {
    this._state = newState;
    return this._state;
  }

  updateQuestionsList(levels) {
    this.questions = levels;
    return this.questions;
  }

  tick(time) {
    return this.update(tick(this._state, time));
  }
}
