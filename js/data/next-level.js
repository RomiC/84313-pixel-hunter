import changeTemplate from '../change-template.js';
import level3Imgs from '../screens/level-type-3-images/level-type-3-images.js';
import level1Img from '../screens/level-type-1-image/level-type-1-image.js';
import level2Imgs from '../screens/level-type-2-images/level-type-2-images.js';
import statGames from '../screens/stat-games/stat-games.js';
import {copy} from './game-utility.js';
import {nextLevel, spendLives, setLastLevelStat, questionsList} from './game-data.js';
import userStat from '../templates/user-stat/user-stat.js';
import {ANSWERS} from './constants.js';

const gameTemplates = {
  '2pic': level2Imgs,
  '1pic': level1Img,
  'paint': level3Imgs
};

const getNextLevel = (isCorrectAnswer, gameData) => {
  if (isCorrectAnswer) {
    gameData = nextLevel(gameData);
    gameData = setLastLevelStat(gameData, ANSWERS.RIGHT);
  } else if (isCorrectAnswer === false) {
    gameData = nextLevel(gameData);
    gameData = spendLives(gameData);
    gameData = setLastLevelStat(gameData, ANSWERS.WRONG);
  }


  if (gameData.lives && gameData.level < 10) {
    const levelData = questionsList[gameData.level];
    const levelView = gameTemplates[levelData.type](levelData);

    const template = levelView.element;
    template.querySelector(`.game`).appendChild(userStat(gameData.stats).element);
    return changeTemplate(template, `game`, gameData);
  } else {
    const GAMES = [gameData]; // сейчас одна, т.к. без сохранения
    const template = statGames(gameData, GAMES).element;
    return changeTemplate(template, `on`, gameData);
  }
};

export default nextLevel;
