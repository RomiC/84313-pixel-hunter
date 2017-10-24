import HeaderView from './header-view.js';
import changeTemplate from '../../change-template.js';
import greetingPage from '../../screens/greeting/greeting.js';

export default (mode, dataGame) => {
  const header = new HeaderView(mode, dataGame);
  header.showGreetingPage = () => {
    changeTemplate(greetingPage().element);
  };
  return header;
};
