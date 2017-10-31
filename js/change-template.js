import footer from './templates/footer/footer.js';
import header from './templates/header/header.js';

const mainScreen = document.querySelector(`main`);

const changeTemplate = (template, header, dataGame) => {
  mainScreen.innerHTML = ``;
  //if (modeHeader) {
  //  const headerTemplate = header(modeHeader, dataGame).element;
  //  mainScreen.appendChild(headerTemplate);
  //}
  if(header && header !== `on`) {
    mainScreen.appendChild(header);
  }
  mainScreen.appendChild(template);
  mainScreen.appendChild(footer().element);
};

export default changeTemplate;
