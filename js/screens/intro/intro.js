import IntroView from './intro-view.js';
import changeTemplate from '../../change-template.js';
import App from '../../application.js';

class IntroScreen {
  init() {
    this._screen = new IntroView();
    this.bind();

    return changeTemplate(this._screen.element);
  }

  bind() {
    this._screen.showNextPage = () => {
      App.showGreeting();
    };
  }
}

export default new IntroScreen();
