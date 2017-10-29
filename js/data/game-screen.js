import changeTemplate from '../change-template.js';
import Level3ImgsView from '../screens/level-type-3-images/level-type-3-images-view.js';
import Level1ImgView from '../screens/level-type-1-image/level-type-1-image-view.js';
import Level2ImgsView from '../screens/level-type-2-images/level-type-2-images-view.js';
import {questionsList, initialGame} from './game-data.js';
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

  init(state = initialGame) {
    const levelData = questionsList[this._state.level];
    this.view = new gameTemplates[levelData.type](levelData);
    this.view.showNextLevel = () => {
      this.onChooseAnswer(this.view.isCorrectAnswer);
    };

    this.model.update(state);
    this.showNextLevel();
  }

  showNextLevel() {
    const template = this.view.element;
    template.querySelector(`.game`).appendChild(userStat(this._state.stats).element);
    return changeTemplate(template, `game`, this._state);
  }

  onChooseAnswer(isCorrectAnswer) {
    if (isCorrectAnswer) {
      this.model.nextLevel();
      this.model.setLastLevelStat(ANSWERS.RIGHT);
    } else {
      this.model.nextLevel();
      this.model.spendLives();
      this.model.setLastLevelStat(ANSWERS.WRONG);
    }

    this._state = this.model._state;
    if (this.model.userInGame()) {
      this.init(this._state);
    } else {
      this.lose();
    }
  }

  tick() {
    this.model.tick();
    this.timer = setTimeout(() => this.tick(), 1000);
  }

  stopTimer() {
    clearTimeout(this.timer);
  }

  lose() {
    App.showStats(this._state);
  }
}

export default (state) => new GameScreen(state);
