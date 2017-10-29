import {initialGame} from '../../data/game-data.js';
import nextLevel from '../../data/next-level.js';
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
      nextLevel(null, initialGame);
    };
  }
}

export default new RulesScreen();
