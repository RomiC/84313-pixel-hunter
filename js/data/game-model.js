import {nextLevel, spendLives, setLastLevelStat, tick} from './game-utility.js';
import {initialGame} from './game-data.js';

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

  userInGame() {
    return this._state.lives && this._state.level < 10;
  }

  update(newState) {
    this._state = newState;
    return this._state;
  }

  tick(time) {
    return this.update(tick(this._state, time));
  }
}
