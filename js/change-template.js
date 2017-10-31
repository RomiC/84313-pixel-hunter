import footer from './templates/footer/footer.js';
import header from './templates/header/header.js';

const mainScreen = document.querySelector(`main`);

const changeTemplate = (template, header) => {
  mainScreen.innerHTML = ``;
  if(header) {
    mainScreen.appendChild(header);
  }
  mainScreen.appendChild(template);
  mainScreen.appendChild(footer().element);

  return mainScreen;
};

export default changeTemplate;
