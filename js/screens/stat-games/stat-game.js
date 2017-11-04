import StatGameView from './stat-games-view.js';
import changeTemplate from '../../change-template.js';
import header from '../../templates/header/header.js';
import {getData} from '../../data/game-load.js';

class StatGameScreen {
  init(userName) {
    const showView = (response) => {
      this._state = response;
      this._screen = new StatGameView(this._state);

      const headerScreen = header(`on`, this._state).init();
      return changeTemplate(this._screen.element, headerScreen);
    };

    getData(`stats/${userName}`, showView);
  }
}

export default new StatGameScreen();
