import changeTemplate from '../change-template.js';
import game3Template from '../screens/level-type-3-images.js';
import level1Img from '../screens/level-type-1-image/level-type-1-image.js';
import level2Imgs from '../screens/level-type-2-images/level-type-2-images.js';
import statsTemplate from '../screens/stat-games.js';
import {questionsList} from './game-data.js';
import {copy} from './game-utility.js';
import {userStat} from '../templates/user-stat.js';

const gameTemplates = {
  '2pic': level2Imgs,
  '1pic': level1Img,
  'paint': game3Template
};

let userDataGame = null;
const nextLevel = (isCorrectAnswer, initialData) => {
  if (initialData) {
    userDataGame = copy(initialData);
  }

  if (isCorrectAnswer) {
    userDataGame.level++;
    userDataGame.stats.push(1);
  } else if (isCorrectAnswer === false) {
    userDataGame.level++;
    userDataGame.lives--;
    userDataGame.stats.push(0);
  }


  if (userDataGame.lives && userDataGame.level < 10) {
    const levelData = questionsList[userDataGame.level];
    const levelView = gameTemplates[levelData.type](levelData);

    const template = levelView.element;
    template.querySelector(`.game`).appendChild(userStat(userDataGame.stats));
    return changeTemplate(template, `game`, userDataGame);
  } else {
    return changeTemplate(statsTemplate([userDataGame]), `on`, userDataGame);
  }
};

export default nextLevel;
