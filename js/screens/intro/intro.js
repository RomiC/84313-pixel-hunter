import IntroView from './intro-view.js';
import changeTemplate from '../../change-template.js';
import greetingPage from './../greeting/greeting.js';

const intro = new IntroView();
intro.showNextPage = () => {
  changeTemplate(greetingPage().element);
};

export default () => intro;
