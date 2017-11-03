(function () {
'use strict';

const getElementFromTemplate = (template) => {
  let elementWrapper = document.createElement(`div`);
  elementWrapper.innerHTML = template;
  return elementWrapper;
};

class AbstractView {
  get template() {
    throw new Error(`get template must be define for view`);
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {
  }

  getMarkup() {
    this._element = this.render();
    this.bind();
  }

  get element() {
    if (!this._element) {
      this.getMarkup();
    }

    return this._element;
  }
}

class IntroView extends AbstractView {
  get template() {
    return `
    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>`.trim();
  }

  bind() {
    this._element.querySelector(`.intro__asterisk`).addEventListener(`click`, (event) => {
      event.preventDefault();
      this.showNextPage();
    });
  }

  showNextPage() {
  }
}

class FooterView extends AbstractView {
  get template() {
    return `
     <footer class="footer">
      <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
      </div>
      </footer>`.trim();
  }

  bind() {
  }
}

var footer = () => new FooterView();

const mainScreen = document.querySelector(`main`);

const changeTemplate = (template, header) => {
  mainScreen.innerHTML = ``;
  if (header) {
    mainScreen.appendChild(header);
  }
  mainScreen.appendChild(template);
  mainScreen.appendChild(footer().element);

  return mainScreen;
};

class IntroScreen {
  init() {
    this._screen = new IntroView();
    this.bind();

    return changeTemplate(this._screen.element);
  }

  bind() {
    this._screen.showNextPage = () => {
      Application.showGreeting();
    };
  }
}

var IntroScreen$1 = new IntroScreen();

class GreetingView extends AbstractView {
  get template() {
    return `
    <div class="greeting central--blur">
      <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
      <h1 class="greeting__asterisk">*</h1>
      <div class="greeting__challenge">
        <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
        <p>Правила игры просты.<br>
          Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
          Задача кажется тривиальной, но не думай, что все так просто.<br>
          Фотореализм обманчив и коварен.<br>
          Помни, главное — смотреть очень внимательно.</p>
      </div>
      <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
    </div>`.trim();
  }

  bind() {
    this._element.querySelector(`.greeting__continue`).addEventListener(`click`, (event) => {
      event.preventDefault();
      this.showNextPage();
    });
  }

  showNextPage() {
  }
}

const ANSWERS = {
  RIGHT: 1,
  FAST: 2,
  SLOW: 3,
  WRONG: 0
};

const ANSWER_SCORES = {
  RIGHT: 100,
  FAST: 50,
  SLOW: -50,
  LIVE: 50
};

const GAME = {
  FAIL: -1,
  AMOUNT_GAME_LEVELS: 10,
  MAX_AMOUNT_LIVES: 3
};

const TIME = {
  FOR_ANSWER: 30,
  FAST_ANSWER_MAX: 10,
  SLOW_ANSWER_MIN: 20
};

class HeaderView extends AbstractView {
  constructor(mode, dataGame) {
    super();
    this._mode = mode;
    this._data = dataGame;
  }

  get template() {
    if (this._mode) {
      return (this._mode === `game`) ? this.headerGameTemplate : this.headerTemplate;
    } else {
      return false;
    }
  }

  get headerGameTemplate() {
    return `
    <header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      <h1 class="game__timer">${this._data.time}</h1>
      <div class="game__lives">
        ${new Array(GAME.MAX_AMOUNT_LIVES - this._data.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
         ${new Array(this._data.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      </div>
     </header>`.trim();
  }

  get headerTemplate() {
    return `<header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
    </header>`.trim();
  }

  bind() {
    this._element.querySelector(`.back`).addEventListener(`click`, (event) => {
      event.preventDefault();
      this.showGreetingPage();
    });
  }

  showGreetingPage() {
  }
}

class Header {
  constructor(mode, dataGame) {
    this.mode = mode;
    this.data = dataGame;
  }

  init() {
    this.screen = new HeaderView(this.mode, this.data);
    this.bind();

    return this.screen.element;
  }

  bind() {
    this.screen.showGreetingPage = () => {
      Application.showWelcome();
    };
  }
}

var header = (mode, dataGame) => new Header(mode, dataGame);

class GreetingScreen {
  init() {
    this._screen = new GreetingView();
    this.bind();

    const headerScreen = header(`on`, this._state).init();
    return changeTemplate(this._screen.element, headerScreen);
  }

  bind() {
    this._screen.showNextPage = () => {
      Application.showRules();
    };
  }
}

var GreetingScreen$1 = new GreetingScreen();

class RulesView extends AbstractView {
  get template() {
    return `
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>`.trim();
  }

  bind() {
    const rulesInput = this._element.querySelector(`.rules__input`);
    const rulesBtn = this._element.querySelector(`.rules__button`);
    rulesInput.addEventListener(`keyup`, () => {
      rulesBtn.disabled = rulesInput.value.length === 0;
    });

    rulesBtn.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.showNextLevel();
    });
  }

  showNextLevel() {
  }
}

class RulesScreen {
  init() {
    this._screen = new RulesView();
    this.bind();

    const headerScreen = header(`on`, this._state).init();
    return changeTemplate(this._screen.element, headerScreen);
  }

  bind() {
    this._screen.showNextLevel = () => {
      Application.showGame();
    };
  }
}

var RulesScreen$1 = new RulesScreen();

const countFinalScores = (answers, lives) => {
  if (answers.length < GAME.AMOUNT_GAME_LEVELS) {
    return GAME.FAIL;
  } else {
    let finallyScores = answers.reduce((sum, answer) => {
      switch (answer) {
        case ANSWERS.RIGHT:
          return sum + ANSWER_SCORES.RIGHT;
        case ANSWERS.FAST:
          return sum + ANSWER_SCORES.RIGHT + ANSWER_SCORES.FAST;
        case ANSWERS.SLOW:
          return sum + ANSWER_SCORES.RIGHT + ANSWER_SCORES.SLOW;
      }

      return sum;
    }, 0);
    return finallyScores + lives * ANSWER_SCORES.LIVE;
  }
};

const tick = (game) => {
  const gameStat = copy(game);
  gameStat.time = gameStat.time + 1;
  return gameStat;
};

const copy = (object) => {
  let newObj = Object.assign({}, object);
  for (const key in newObj) {
    if (newObj[key] instanceof Array) {
      newObj[key] = newObj[key].slice();
    }
  }
  return newObj;
};


const nextLevel = (gameData) => {
  const game = copy(gameData);
  game.level++;
  return game;
};

const spendLives = (gameData) => {
  const game = copy(gameData);
  game.lives--;
  if (game.lives < 0) {
    throw new RangeError(`Can't set negative lives`);
  }
  return game;
};


const setLastLevelStat = (gameData, answer) => {
  const game = copy(gameData);
  game.stats.push(answer);
  return game;
};


const resize = (frame, given) => {
  let pictureWidth = 0;
  let pictureHeight = 0;
  let proportion = 1;

  if (given.width > given.height) {
    pictureWidth = frame.width;
    proportion = frame.width / given.width;
    pictureHeight = given.height * proportion;
  } else {
    pictureHeight = frame.height;
    proportion = frame.height / given.height;
    pictureWidth = given.width * proportion;
  }

  if (pictureHeight > frame.height) {
    proportion = frame.height / pictureHeight;
    pictureHeight = frame.height;
    pictureWidth = pictureWidth * proportion;
  } else if (pictureWidth > frame.width) {
    proportion = frame.width / pictureWidth;
    pictureWidth = frame.width;
    pictureHeight = pictureHeight * proportion;
  }
  return {
    width: pictureWidth,
    height: pictureHeight
  };
};


const resizeImages = (el) => {
  const images = Array.prototype.slice.call(el.querySelectorAll(`img`));

  images.forEach((img) => {
    img.onload = () => {
      const frameSize = {
        width: img.parentElement.clientWidth,
        height: img.parentElement.clientHeight
      };
      const imgSize = {
        width: img.naturalWidth,
        height: img.naturalHeight
      };
      const resizePicture = resize(frameSize, imgSize);
      img.width = resizePicture.width;
      img.height = resizePicture.height;
    };
  });
};

class UserStatView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return `<div class="stats">
    <ul class="stats">
      ${this._data.map((score) => this.resultLevel(score)).join(``)}
      ${new Array(GAME.AMOUNT_GAME_LEVELS - this._data.length).fill(`<li class="stats__result stats__result--unknown"></li>`)}
    </ul>
  </div>`.trim();
  }

  resultLevel(type) {
    if (type === ANSWERS.RIGHT) {
      return `<li class="stats__result stats__result--correct"></li>`;
    } else if (type === ANSWERS.FAST) {
      return `<li class="stats__result stats__result--fast"></li>`;
    } else if (type === ANSWERS.SLOW) {
      return `<li class="stats__result stats__result--slow"></li>`;
    } else if (type === ANSWERS.WRONG) {
      return `<li class="stats__result stats__result--wrong"></li>`;
    }

    return ``;
  }

  bind() {
  }
}

var userStat = (userStat) => new UserStatView(userStat);

const getAmountTypeAnswer = (dataGame, typeAnswer) => {
  return dataGame.filter((score) => score === typeAnswer).length;
};

const getDetailScores = (dataGame, typeAnswer, typeAnswerScore) => {
  return getAmountTypeAnswer(dataGame, typeAnswer) * typeAnswerScore;
};

class StatGamesView extends AbstractView {
  constructor(userDataStats) {
    super();
    this._statUser = userDataStats;
    this._lives = 3 - userDataStats.filter((value) => value === 0).length;
    this._dataGames = [userDataStats];
    this._finalScores = countFinalScores(this._statUser, this._lives);
  }

  get template() {
    return `
      <div class="result">
        ${ this.titleStat }
        ${ this._dataGames.map((game, i) => this.getResultGame(i + 1)).join(``)}
      </div>`.trim();
  }

  get titleStat() {
    return (this._finalScores === GAME.FAIL) ? `<h1>Поражение!</h1>` : `<h1>Победа!</h1>`;
  }

  getResultGame(indexGame) {
    if (this._finalScores !== GAME.FAIL) {
      return `
      <table class="result__table">
          <tr>
            <td class="result__number">${indexGame}.</td>
            <td colspan="2">
              ${userStat(this._statUser).template}
            </td>
            <td class="result__points">×&nbsp;${ANSWER_SCORES.RIGHT}</td>
            <td class="result__total">
              ${getDetailScores(this._statUser, ANSWERS.RIGHT, ANSWER_SCORES.RIGHT)}
            </td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">
              ${getAmountTypeAnswer(this._statUser, ANSWERS.FAST)}&nbsp;
              <span class="stats__result stats__result--fast"></span>
            </td>
            <td class="result__points">×&nbsp;${ANSWER_SCORES.FAST}</td>
            <td class="result__total">
              ${getDetailScores(this._statUser, ANSWERS.FAST, ANSWER_SCORES.FAST)}
            </td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${this._lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;${ANSWER_SCORES.LIVE}</td>
            <td class="result__total">${this._lives * ANSWER_SCORES.LIVE}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">
              ${getAmountTypeAnswer(this._statUser, ANSWERS.SLOW)}&nbsp;
              <span class="stats__result stats__result--slow"></span>
            </td>
            <td class="result__points">×&nbsp;${ANSWER_SCORES.SLOW}</td>
            <td class="result__total">
              ${getDetailScores(this._statUser, ANSWERS.SLOW, ANSWER_SCORES.SLOW)}
            </td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">
              ${this._finalScores}
            </td>
          </tr>
        </table>`;
    }

    return `
    <table class="result__table">
      <tr>
        <td class="result__number">${indexGame}.</td>
          <td colspan="2">
            ${userStat(this._statUser).template}
          </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
  }
}

class StatGameScreen {
  init(gameStat) {
    this._state = gameStat;
    this._screen = new StatGamesView(this._state);

    const headerScreen = header(`on`, this._state).init();
    return changeTemplate(this._screen.element, headerScreen);
  }
}

var StatsScreen = new StatGameScreen();

class Level3ImgsView extends AbstractView {
  constructor(levelData) {
    super();
    this._level = levelData;
    const amountTypePainting = levelData.answers.filter((answer) => answer.type === `painting`).length;
    this._level.typeAnswer = (amountTypePainting === 1) ? `painting` : `photo`;
  }

  get titleLevel() {
    return (this._level.typeAnswer === `painting`) ? `Найдите рисунок среди изображений` : `Найдите фото среди изображений`;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">${ this.titleLevel }</p>
      <form class="game__content  game__content--triple">
        ${this._level.answers.map((option) => `<div class="game__option">
            <img src="${option.image.url}" alt="${option.type}" width="${option.image.width}" height="${option.image.height}">
        </div>`).join(``)}
      </form>
    </div>`.trim();
  }

  bind() {
    const frameSize = {
      width: 304,
      height: 455
    };
    resizeImages(this._element, frameSize);

    const pictures = Array.prototype.slice.call(this._element.querySelectorAll(`.game__option`));

    pictures.forEach((pic) => {
      pic.addEventListener(`click`, (ev) => {
        const isCorrectAnswer = ev.target.lastElementChild.alt === this._level.typeAnswer;
        this.showNextLevel(isCorrectAnswer);
      });
    });

  }

  showNextLevel() {
  }
}

class Level1ImgView extends AbstractView {
  constructor(levelData) {
    super();
    this._level = levelData;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">Угадай, фото или рисунок?</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this._level.answers[0].image.url}" alt="Option 1" width="${this._level.answers[0].image.width}" height="${this._level.answers[0].image.height}">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
    </div>`.trim();
  }

  bind() {
    const frameSize = {
      width: 705,
      height: 455
    };
    resizeImages(this._element, frameSize);

    const radioBtns = Array.prototype.slice.call(this._element.querySelectorAll(`input[type=radio]`));

    radioBtns.forEach((radioBtn) => {
      radioBtn.addEventListener(`change`, (ev) => {
        const isCorrectAnswer = ev.target.value === this._level.answers[0].type;
        this.showNextLevel(isCorrectAnswer);
      });
    });
  }

  showNextLevel() {
  }
}

class Level2ImgsView extends AbstractView {
  constructor(levelData) {
    super();
    this._level = levelData;
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
      <form class="game__content">
        ${this._level.answers.map((option, i) => `<div class="game__option">
          <img src="${option.image.url}" alt="Option ${i + 1}" width="${option.image.width}" height="${option.image.height}">
          <label class="game__answer game__answer--photo">
            <input name="question${i + 1}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question${i + 1}" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>`).join(``)}
      </form>
    </div>`.trim();
  }

  checkQuestion(a1, a2) {
    return this._level.answers[0].type === a1 && this._level.answers[1].type === a2;
  }

  bind() {
    const frameSize = {
      width: 468,
      height: 458
    };
    resizeImages(this._element, frameSize);

    const radioBtns = Array.prototype.slice.call(this._element.querySelectorAll(`input[type=radio]`));

    let q1 = false;
    let q2 = false;
    radioBtns.forEach((radioBtn) => {
      radioBtn.addEventListener(`change`, (ev) => {
        if (ev.target.name === `question1`) {
          q1 = ev.target.value;
        } else {
          q2 = ev.target.value;
        }

        if (q1 && q2) {
          const isCorrectAnswer = this.checkQuestion(q1, q2);
          this.showNextLevel(isCorrectAnswer);
        }
      });
    });

  }

  showNextLevel() {
  }
}

const initialGame = Object.freeze({
  level: 0,
  lives: 3,
  time: 0,
  stats: []
});

const uploadGameQuestions = () => {
  return fetch(`https://es.dump.academy/pixel-hunter/questions`, {
    method: `get`
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
  }).catch((err) => {
    throw new Error(`Ошибка: ${err.message}`);
  });
};

class GameModel {
  constructor(state = initialGame) {
    this._state = state;
  }

  nextLevel() {
    this.update(nextLevel(this._state));
  }

  spendLives() {
    this.update(spendLives(this._state));
  }

  setLastLevelStat(answer) {
    this.update(setLastLevelStat(this._state, answer));
  }

  getLevelData() {
    return this.questionsList && this.questionsList[this._state.level];
  }

  loadQuestionsData() {
    return uploadGameQuestions();
  }

  stopTimer() {
    this._state.time = 0;
    this.update(this._state);
  }

  userInGame() {
    return this._state.lives && this._state.level < 10;
  }

  update(newState) {
    this._state = newState;
    return this._state;
  }

  updateQuestionsList(levels) {
    this.questionsList = levels;
    return this.questionsList;
  }

  tick(time) {
    return this.update(tick(this._state, time));
  }
}

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

  init(state = initialGame) {
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

  lose() {
    Application.showStats(this._state);
  }
}

var gameScreen = new GameScreen();

const controllerId = {
  WELCOME: ``,
  RULES: `rules`,
  GREETING: `greeting`,
  GAME: `game`,
  STATS: `stats`
};

const routes = {
  [controllerId.WELCOME]: IntroScreen$1,
  [controllerId.GREETING]: GreetingScreen$1,
  [controllerId.RULES]: RulesScreen$1,
  [controllerId.GAME]: gameScreen,
  [controllerId.STATS]: StatsScreen
};

const createUrlData = (data) => {
  return `=${data.join(``)}:${Date.now()}`;
};

const loadHashData = (data) => {
  let game;
  if (data) {
    const timestamp = data.indexOf(`:`);
    const stats = data.replace(`stats=`, ``).slice(0, timestamp);
    game = stats.split(``).map((element) => parseInt(element, 10));
  }
  return game;
};

class Application {
  static init() {
    const changeHashHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`=`);
      this.changeHash(id, data);
    };
    window.addEventListener(`hashchange`, () => changeHashHandler());
    changeHashHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];
    if (controller) {
      controller.init(loadHashData(data));
    }
  }

  static showWelcome() {
    location.hash = controllerId.WELCOME;
  }

  static showGreeting() {
    location.hash = controllerId.GREETING;
  }

  static showRules() {
    location.hash = controllerId.RULES;
  }

  static showGame() {
    location.hash = controllerId.GAME;
  }

  static showStats(data) {
    location.hash = `${controllerId.STATS}${createUrlData(data.stats)}`;
  }
}

Application.init();

}());

//# sourceMappingURL=main.js.map
