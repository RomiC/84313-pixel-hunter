import {nextLevel, spendLives, setLastLevelStat, tick} from './game-utility.js';
import {initialGame} from './game-data.js';
import {uploadGameQuestions} from './game-load-data.js';

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
    return this.questionsList && this.questionsList[this._state.level];
  }

  loadQuestionsData() {
    return uploadGameQuestions();
  }

  stopTimer() {
    this._state.time = 0;
    this.update(this._state);
  }

  userInGame() {
    return this._state.lives && this._state.level < 10;
  }

  update(newState) {
    this._state = newState;
    return this._state;
  }

  updateQuestionsList(levels) {
    this.questionsList = levels;
    return this.questionsList;
  }

  tick(time) {
    return this.update(tick(this._state, time));
  }
}
