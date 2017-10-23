import GreetingViews from './greeting-views.js';
import changeTemplate from '../../change-template.js';
import rulesPage from '../rules/rules.js';

const greeting = new GreetingViews();
greeting.showNextPage = () => {
  changeTemplate(rulesPage().element, `on`);
};

export default () => greeting;

