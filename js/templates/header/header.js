import HeaderView from './header-view.js';
import App from '../../application.js';

class Header {
  constructor(mode, dataGame) {
    this.mode = mode;
    this.data = dataGame;
  }

  init() {
    this.screen = new HeaderView(this.mode, this.data);
    this.bind();

    return this.screen.element;
  }

  bind() {
    this.screen.showGreetingPage = () => {
      App.showWelcome();
    };
  }
}

export default (mode, dataGame) => new Header(mode, dataGame);
