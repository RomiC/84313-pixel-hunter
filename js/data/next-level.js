import changeTemplate from '../change-template.js';
import game3Template from '../templates/game-3.js';
import game2Template from '../templates/game-2.js';
import game1Template from '../templates/game-1.js';
import statsTemplate from '../templates/stats.js';
import {levels} from './game-data.js';
import {copyOnWrite} from './game-utility.js';

const gameTemplates = {
  '2pic': game1Template,
  '1pic': game2Template,
  'paint': game3Template
};

const nextLevel = (userDataGame, isCorrectAnswer) => {
  const nextLevelDataGame = copyOnWrite(userDataGame);
  if (isCorrectAnswer) {
    nextLevelDataGame.level++;
    nextLevelDataGame.stats.push(1);
  } else if (isCorrectAnswer === false) {
    nextLevelDataGame.level++;
    nextLevelDataGame.lives--;
    nextLevelDataGame.stats.push(0);
  }


  if (nextLevelDataGame.lives && nextLevelDataGame.level < 10) {
    const levelData = levels[nextLevelDataGame.level];
    const template = gameTemplates[levelData.type](levelData, nextLevelDataGame);

    return changeTemplate(template, `game`, nextLevelDataGame);
  } else {
    return changeTemplate(statsTemplate([nextLevelDataGame.stats]), `on`, nextLevelDataGame);
  }
};

export default nextLevel;
