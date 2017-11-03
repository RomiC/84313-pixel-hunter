import StatGameView from './stat-games-view.js';
import changeTemplate from '../../change-template.js';
import header from '../../templates/header/header.js';

class StatGameScreen {
  init(userName) {
    fetch(`https://es.dump.academy/pixel-hunter/stats/${userName}`, {
      method: `get`
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
    }).then((response) => {
      this._state = response;
      this._screen = new StatGameView(this._state);

      const headerScreen = header(`on`, this._state).init();
      return changeTemplate(this._screen.element, headerScreen);
    }).catch((err) => {
      throw new Error(`Ошибка: ${err.message}`);
    });
  }
}

export default new StatGameScreen();
