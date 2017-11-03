import changeTemplate from '../../change-template.js';
import Level3ImgsView from './level-type-3-images-view.js';
import Level1ImgView from './level-type-1-image-view.js';
import Level2ImgsView from './level-type-2-images-view.js';
import {initialGame} from './../../data/game-data.js';
import {postData} from './../../data/game-load.js';
import userStat from '../../templates/user-stat/user-stat.js';
import {ANSWERS, TIME} from './../../data/constants.js';
import App from '../../application.js';
import GameModel from './../../data/game-model.js';
import header from '../../templates/header/header.js';

const gameTemplates = {
  "two-of-two": Level2ImgsView,
  "tinder-like": Level1ImgView,
  "one-of-three": Level3ImgsView
};

class GameScreen {
  constructor() {
    this.model = new GameModel(initialGame);
    this._state = this.model._state;
    window.addEventListener(`hashchange`, () => this.stopTimer());
  }

  loadLevelDataInView(levelData) {
    this.view = new gameTemplates[levelData.type](levelData);
    this.view.showNextLevel = (isCorrectAnswer) => {
      this.onChooseAnswer(isCorrectAnswer);
    };
    this.showNextLevel();
  }

  init(userName, state = initialGame) {
    this.model.userName = userName;
    this._state = this.model.update(state);

    let levelData = this.model.getLevelData();
    if (!levelData) {
      const loadLevelDataInView = (levels) => {
        this.model.updateQuestionsList(levels);
        levelData = this.model.getLevelData();
        this.loadLevelDataInView(levelData);
      };

      this.model.loadQuestionsData().then((levels) => {
        loadLevelDataInView(levels);
      });
    } else {
      this.loadLevelDataInView(levelData);
    }
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
      this.init(this.model.userName, this._state);
    } else {
      this.gameOver();
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
    this.timer = setTimeout(() => this.tick(), 1000);
    if (this._state.time === TIME.FOR_ANSWER) {
      this.onChooseAnswer(false);
    }
  }

  stopTimer() {
    if (this.timer) {
      const time = this._state.time;
      this.model.stopTimer();
      clearTimeout(this.timer);
      return time;
    }

    return null;
  }

  gameOver() {
    const body = {
      "stats": this._state.stats
    };
    postData(`stats/${this.model.userName}`, body, () => App.showStats(this.model.userName));
  }
}

export default new GameScreen();
