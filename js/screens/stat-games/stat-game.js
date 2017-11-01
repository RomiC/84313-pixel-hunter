import StatGameView from './stat-games-view.js';
import changeTemplate from '../../change-template.js';
import header from '../../templates/header/header.js';

class StatGameScreen {
  init(gameStat) {
    this._state = gameStat;
    this._screen = new StatGameView(this._state);

    const headerScreen = header(`on`, this._state).init();
    return changeTemplate(this._screen.element, headerScreen);
  }
}

export default new StatGameScreen();
