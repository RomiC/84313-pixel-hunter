import GreetingViews from './greeting-views.js';
import changeTemplate from '../../change-template.js';
import App from '../../application.js';

class GreetingScreen {
  init() {
    this._screen = new GreetingViews();
    this.bind();

    return changeTemplate(this._screen.element, `on`);
  }

  bind() {
    this._screen.showNextPage = () => {
      App.showRules();
    };
  }
}

export default new GreetingScreen();
