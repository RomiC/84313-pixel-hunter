import GreetingViews from './greeting-views.js';
import changeTemplate from '../../change-template.js';
import App from '../../application.js';
import header from '../../templates/header/header.js';

class GreetingScreen {
  init() {
    this._screen = new GreetingViews();
    this.bind();

    const headerScreen = header(`on`, this._state).init();
    return changeTemplate(this._screen.element, headerScreen);
  }

  bind() {
    this._screen.showNextPage = () => {
      App.showRules();
    };
  }
}

export default new GreetingScreen();
