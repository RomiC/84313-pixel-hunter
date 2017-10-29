import RulesView from './rules-view.js';
import changeTemplate from '../../change-template.js';
import App from '../../application.js';

class RulesScreen {
  init() {
    this._screen = new RulesView();
    this.bind();

    return changeTemplate(this._screen.element, `on`);
  }

  bind() {
    this._screen.showNextLevel = () => {
      App.showGame();
    };
  }
}

export default new RulesScreen();
