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
        ${new Array(3 - this._data.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
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

const FAIL_GAME = -1;

const TIME = {
  FOR_ANSWER: 30,
  FAST_ANSWER_MAX: 10,
  SLOW_ANSWER_MIN: 20
};

const amountAnswers = 10;

const countFinalScores = (answers, lives) => {
  if (answers.length < amountAnswers) {
    return FAIL_GAME;
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
      ${new Array(10 - this._data.length).fill(`<li class="stats__result stats__result--unknown"></li>`)}
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
    return (this._finalScores === FAIL_GAME) ? `<h1>Поражение!</h1>` : `<h1>Победа!</h1>`;
  }

  getResultGame(indexGame) {
    if (this._finalScores !== FAIL_GAME) {
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
  }

  get template() {
    return `
    <div class="game">
      <p class="game__task">Найдите рисунок среди изображений</p>
      <form class="game__content  game__content--triple">
        ${[...this._level.options].map((option) => `<div class="game__option">
            <img src="${option}" alt="Option 1" width="304" height="455">
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
        this.isCorrectAnswer = ev.target.lastElementChild.src === this._level.answer;
        this.showNextLevel();
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
          <img src="${this._level.options[0].question}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint">
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
        this.isCorrectAnswer = ev.target.value === this._level.options[0].answer;
        this.showNextLevel();
      });
    });
  }

  showNextLevel() {
  }
}

const checkQuestion = (options, a1, a2) => {
  return options[0].answer === a1 && options[1].answer === a2;
};

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
        ${this._level.options.map((option, i) => `<div class="game__option">
          <img src="${option.question}" alt="Option ${i + 1}" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input name="question${i + 1}" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question${i + 1}" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>`).join(``)}
      </form>
    </div>`.trim();
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
          this.isCorrectAnswer = checkQuestion(this._level.options, q1, q2);
          this.showNextLevel();
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

const questionsList = [
  {
    type: `TWO_PIC`,
    options: [
      {
        question: `http://i.imgur.com/1KegWPz.jpg`,
        answer: `photo`
      },
      {
        question: `https://k42.kn3.net/CF42609C8.jpg`,
        answer: `paint`
      }
    ]
  },
  {
    type: `ONE_PIC`,
    options: [{
      question: `https://picfan.net/uploads/posts/2016-10/1477143762_14-porazitelnyy-giperrealizm-kartin-hudozhnika-leona-fushe.jpg`,
      answer: `paint`
    }]
  },
  {
    type: `ONE_PAINT`,
    options: new Set([`https://i.imgur.com/DiHM5Zb.jpg`, `https://k32.kn3.net/5C7060EC5.jpg`, `http://i.imgur.com/DKR1HtB.jpg`]),
    answer: `https://k32.kn3.net/5C7060EC5.jpg`
  },
  {
    type: `TWO_PIC`,
    options: [
      {
        question: `https://flytothesky.ru/wp-content/uploads/2013/05/%D0%A0%D0%B5%D0%B0%D0%BB%D0%B8%D1%81%D1%82%D0%B8%D1%87%D0%BD%D1%8B%D0%B5-%D0%BA%D0%B0%D1%80%D1%82%D0%B8%D0%BD%D1%8B-%D0%9F%D0%B5%D0%B4%D1%80%D0%BE-%D0%9A%D0%B0%D0%BC%D0%BF%D0%BE%D1%81%D0%B0-13.jpg`,
        answer: `paint`
      },
      {
        question: `http://www.rosphoto.com/images/u/articles/1511/4-anastasiya-kostakova.jpg`,
        answer: `photo`
      }
    ]
  },
  {
    type: `ONE_PIC`,
    options: [{
      question: `http://trinixy.ru/pics5/20160115/interesnie_photo_23.jpg`,
      answer: `photo`
    }]
  },
  {
    type: `ONE_PAINT`,
    options: new Set([`https://st.kp.yandex.net/im/kadr/1/2/9/kinopoisk.ru-Jack-Nicholson-1297136.jpg`,
      `http://vev.ru/uploads/images/00/04/29/2011/08/07/899bcc.jpg`,
      `http://funpress.ru/uploads/posts/2012-10/1351691961_hiperrealistic-paintings-of-robin-eley-2.jpg`]),
    answer: `http://funpress.ru/uploads/posts/2012-10/1351691961_hiperrealistic-paintings-of-robin-eley-2.jpg`
  },
  {
    type: `TWO_PIC`,
    options: [
      {
        question: `http://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/12/2005/09/lowresmagnum.jpg`,
        answer: `photo`
      },
      {
        question: `https://artlogic-res.cloudinary.com/w_1200,h_1000,c_limit,f_auto,fl_lossy/artlogicstorage/plusonegallery/images/view/8ed8b28bf1561e91b1fad1598b34702cd946c5a0.jpg`,
        answer: `paint`
      }
    ]
  },
  {
    type: `ONE_PIC`,
    options: [{
      question: `https://s-media-cache-ak0.pinimg.com/originals/31/dc/4f/31dc4f9c572c71190174fb38d82222e1.jpg`,
      answer: `paint`
    }]
  },
  {
    type: `ONE_PAINT`,
    options: new Set([`http://img0.liveinternet.ru/images/attach/c/1//58/904/58904305__MG_8199_sm_.jpg`,
      `http://bestpozitiv.ru/wp-content/uploads/2013/12/samye-krasivye-fotografii-dikix-zhivotnyx-03.jpg`,
      `https://s00.yaplakal.com/pics/pics_original/0/6/9/10056960.jpg`]),
    answer: `https://s00.yaplakal.com/pics/pics_original/0/6/9/10056960.jpg`
  },
  {
    type: `ONE_PIC`,
    options: [{
      question: `https://190330.selcdn.ru/prmira/2016/11/7/%D0%BA%D0%B0%D1%80%D0%B0.jpg`,
      answer: `photo`
    }]
  }
];

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

  tick(time) {
    return this.update(tick(this._state, time));
  }
}

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
    Application.showStats(this._state);
  }
}

var gameScreen = (state) => new GameScreen(state);

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
  [controllerId.GAME]: gameScreen(),
  [controllerId.STATS]: StatsScreen
};

const createHashData = (data) => {
  return data.join(``);
};

const loadHashData = (data) => {
  let game;
  if (data) {
    game = data.replace(`stats=`, ``).split(``).map((element) => parseInt(element, 10));
  }
  return game;
};

class Application {
  static init() {
    const changeHashHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
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
    location.hash = `${controllerId.STATS}?stats=${createHashData(data.stats)}`;
  }
}

Application.init();

}());

//# sourceMappingURL=main.js.map
