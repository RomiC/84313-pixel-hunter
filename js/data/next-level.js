import changeTemplate from '../change-template.js';
import game3Template from '../templates/game-3.js';
import game2Template from '../templates/game-2.js';
import game1Template from '../templates/game-1.js';
import {levels} from './game-data.js';

const gameTemplates = {
  '2pic': game1Template,
  '1pic': game2Template,
  'paint': game3Template
};

const nextLevel = (userDataGame) => {
  const levelData = levels[userDataGame.level];
  const template = gameTemplates[levelData.type](levelData, userDataGame);

  return changeTemplate(template, `game`, userDataGame);
};


//changeTemplate(statsTemplate, `on`);

export default nextLevel;
