import {initialGame, nextLevel, spendLives} from './game-data.js';

export default class GameModel {
  constructor(state = initialGame) {
    this._state = state;
  }

  nextLevel() {
    this._state = nextLevel(this._state);
  }

  spendLives() {
    this._state = spendLives(this._state);
  }
}
