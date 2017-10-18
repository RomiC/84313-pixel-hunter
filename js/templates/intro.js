import getElementFromTemplate from '../create-DOM.js';
import changeTemplate from '../change-template.js';
import greetingTemplate from './greeting.js';

const statsTemplate = `
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;

const element = getElementFromTemplate(statsTemplate);

element.querySelector(`.intro__asterisk`).addEventListener(`click`, (event) => {
  event.preventDefault();
  changeTemplate(greetingTemplate);
});

export default element;
