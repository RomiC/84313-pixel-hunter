import GameScreen from '../../data/game-screen.js';
import RulesView from './rules-view.js';
import changeTemplate from '../../change-template.js';

class RulesScreen {
  init() {
    this._screen = new RulesView();
    this.bind();

    return changeTemplate(this._screen.element, `on`);
  }

  bind() {
    this._screen.showNextLevel = () => {
      GameScreen.init();
    };
  }
}

export default new RulesScreen();
