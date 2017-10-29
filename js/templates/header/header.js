import HeaderView from './header-view.js';
import App from '../../application.js';

export default (mode, dataGame) => {
  const header = new HeaderView(mode, dataGame);
  header.showGreetingPage = () => {
    App.showWelcome();
  };
  return header;
};
