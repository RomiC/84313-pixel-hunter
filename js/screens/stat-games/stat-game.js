import StatGameView from './stat-games-view.js';
import changeTemplate from '../../change-template.js';

class StatGameScreen {
  init(dataGame) {
    this._state = dataGame;
    const GAMES = [this._state.stats]; // сейчас одна, т.к. без сохранения
    this._screen = new StatGameView(this._state, GAMES);
    return changeTemplate(this._screen.element, `on`);
  }
}

export default new StatGameScreen();
