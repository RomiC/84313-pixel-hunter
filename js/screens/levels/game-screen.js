import changeTemplate from '../../change-template.js';
import Level3ImgsView from './level-type-3-images-view.js';
import Level1ImgView from './level-type-1-image-view.js';
import Level2ImgsView from './level-type-2-images-view.js';
import {questionsList, initialGame} from './../../data/game-data.js';
import userStat from '../../templates/user-stat/user-stat.js';
import {ANSWERS, TIME} from './../../data/constants.js';
import App from '../../application.js';
import GameModel from './../../data/game-model.js';
import header from '../../templates/header/header.js';
import {copy} from '../../data/game-utility.js';

const gameTemplates = {
  TWO_PIC: Level2ImgsView,
  ONE_PIC: Level1ImgView,
  ONE_PAINT: Level3ImgsView
};

class GameScreen {
  constructor(state = copy(initialGame)) {
    this.model = new GameModel(state);
    this._state = this.model._state;
    window.addEventListener(`hashchange`, () => this.stopTimer());
  }

  init(state = copy(initialGame)) {
    this._state = this.model.update(state);
    const levelData = questionsList[this._state.level];
    this.view = new gameTemplates[levelData.type](levelData);
    this.view.showNextLevel = () => {
      this.onChooseAnswer(this.view.isCorrectAnswer);
    };
    this.showNextLevel();
  }

  showNextLevel() {
    const template = this.view.element;
    template.querySelector(`.game`).appendChild(userStat(this._state.stats).element);

    const headerGame = header(`game`, this._state).init();
    const screen = changeTemplate(template, headerGame, this._state);
    this.headerContainer = screen.querySelector(`header`);

    this.tick();
  }

  onChooseAnswer(isCorrectAnswer) {
    const spendTimeOnAnswer = this.stopTimer();
    if (isCorrectAnswer) {
      this.model.nextLevel();

      let typeOfAnswer = ANSWERS.RIGHT;
      if (spendTimeOnAnswer < TIME.FAST_ANSWER_MAX) {
        typeOfAnswer = ANSWERS.FAST;
      } else if (spendTimeOnAnswer > TIME.SLOW_ANSWER_MIN) {
        typeOfAnswer = ANSWERS.SLOW;
      }

      this.model.setLastLevelStat(typeOfAnswer);
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

  updateHeader(state) {
    const headerGame = header(`game`, state).init();
    this.headerContainer.innerHTML = ``;
    this.headerContainer.appendChild(headerGame);
  }

  tick() {
    this._state = this.model.tick();
    this.updateHeader(this._state);
    if (this._state.time === TIME.FOR_ANSWER) {
      this.onChooseAnswer(false);
    }
    this.timer = setTimeout(() => this.tick(), 1000);
  }

  stopTimer() {
    const time = this._state.time;
    this.model.stopTimer();
    clearTimeout(this.timer);
    return time;
  }

  lose() {
    App.showStats(this._state);
  }
}

export default (state) => new GameScreen(state);
