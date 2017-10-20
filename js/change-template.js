import footer from './templates/footer.js';
import header from './templates/header.js';

const mainScreen = document.querySelector(`main`);

const changeTemplate = (template, modeHeader, dataGame) => {
  mainScreen.innerHTML = ``;
  if (modeHeader) {
    const headerTemplate = header(dataGame, modeHeader);
    mainScreen.appendChild(headerTemplate);
  }
  mainScreen.appendChild(template);
  mainScreen.appendChild(footer);
};

export default changeTemplate;
