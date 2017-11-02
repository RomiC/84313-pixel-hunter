import StatGameView from './stat-games-view.js';
import changeTemplate from '../../change-template.js';
import header from '../../templates/header/header.js';

class StatGameScreen {
  init(dataGame) {
    this._state = dataGame;
    const GAMES = [this._state.stats];
    this._screen = new StatGameView(this._state, GAMES);

    const headerScreen = header(`on`, this._state).init();
    return changeTemplate(this._screen.element, headerScreen);
  }
}

export default new StatGameScreen();
