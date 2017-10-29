import changeTemplate from '../change-template.js';
import Level3ImgsView from '../screens/level-type-3-images/level-type-3-images-view.js';
import Level1ImgView from '../screens/level-type-1-image/level-type-1-image-view.js';
import Level2ImgsView from '../screens/level-type-2-images/level-type-2-images-view.js';
import StatGamesView from '../screens/stat-games/stat-games-view.js';
import {nextLevel, spendLives, setLastLevelStat, questionsList, initialGame} from './game-data.js';
import userStat from '../templates/user-stat/user-stat.js';
import {ANSWERS} from './constants.js';
import App from '../application.js';
import GameModel from './game-model.js';

const gameTemplates = {
  TWO_PIC: Level2ImgsView,
  ONE_PIC: Level1ImgView,
  ONE_PAINT: Level3ImgsView
};

class GameScreen {
  constructor(state = initialGame) {
    this.model = new GameModel(state);
    this._state = this.model._state;
  }

  init() {
    this.showNextLevel();
  }

  showNextLevel() {
    const levelData = questionsList[this._state.level];
    const levelView = new gameTemplates[levelData.type](levelData);
    levelView.showNextLevel = () => {
      this.onChooseAnswer(levelView.isCorrectAnswer);
    };

    const template = levelView.element;
    template.querySelector(`.game`).appendChild(userStat(this._state.stats).element);
    return changeTemplate(template, `game`, this._state);
  }

  onChooseAnswer(isCorrectAnswer) {
    if (isCorrectAnswer) {
      this._state = nextLevel(this._state);
      this._state = setLastLevelStat(this._state, ANSWERS.RIGHT);
    } else {
      this._state = nextLevel(this._state);
      this._state = spendLives(this._state);
      this._state = setLastLevelStat(this._state, ANSWERS.WRONG);
    }

    if(this._state.lives && this._state.level < 10) {
      this.showNextLevel();
    } else {
      this.die();
    }
  }

  die() {
    App.showStats(this._state);
  }
}

export default new GameScreen();
