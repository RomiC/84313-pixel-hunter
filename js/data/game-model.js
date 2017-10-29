import {initialGame, nextLevel, spendLives} from './game-data.js';

export default class GameModel {
  constructor(state = initialGame) {
    this._state = state;
  }

  nextLevel() {
    this._state = nextLevel();
  }

  spendLives() {
    this._state = spendLives();
  }

  canDie() {
    return this._state.lives && this._state.level < 10;
  }
}
