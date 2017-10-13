import getElementFromTemplate from '../createDOM.js';
import changeTemplate from '../changeTemplate.js';
import greetingTemplate from './greeting.js';

const statsTemplate = `
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;

const element = getElementFromTemplate(statsTemplate);

element.querySelector(`.intro__asterisk`).onclick = (event) => {
  event.preventDefault();
  changeTemplate(greetingTemplate);
};

export default element;
