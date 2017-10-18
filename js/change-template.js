import footer from './templates/footer.js';
import header from './templates/header.js';

const mainScreen = document.querySelector(`main`);

const changeTemplate = (template, dataGame, modeHeader) => {
  mainScreen.innerHTML = ``;
  const headerTemplate = header(dataGame, modeHeader);
  if (headerTemplate) {
    mainScreen.appendChild(headerTemplate);
  }
  mainScreen.appendChild(template);
  mainScreen.appendChild(footer);
};

export default changeTemplate;
