import RulesView from './rules-view.js';
import changeTemplate from '../../change-template.js';
import App from '../../application.js';
import header from '../../templates/header/header.js';

class RulesScreen {
  init() {
    this._screen = new RulesView();
    this.bind();

    const headerScreen = header(`on`, this._state).init();
    return changeTemplate(this._screen.element, headerScreen);
  }

  bind() {
    this._screen.showNextLevel = () => {
      App.showGame();
    };
  }
}

export default new RulesScreen();
