(function () {
'use strict';

const getElementFromTemplate = (template) => {
  let elementWrapper = document.createElement(`div`);
  elementWrapper.innerHTML = template;
  return elementWrapper;
};

const footerTemplate = `
   <footer class="footer">
    <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
    <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
    <div class="footer__social-links">
      <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
      <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
      <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
      <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
    </div>
  </footer>`;

var footer = getElementFromTemplate(footerTemplate);

const initialGame = Object.freeze({
  level: 0,
  lives: 3,
  time: 0,
  stats: []
});

const questionsList = [
  {
    type: `2pic`,
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
    type: `1pic`,
    options: [{
      question: `https://picfan.net/uploads/posts/2016-10/1477143762_14-porazitelnyy-giperrealizm-kartin-hudozhnika-leona-fushe.jpg`,
      answer: `paint`
    }]
  },
  {
    type: `paint`,
    options: new Set([`https://i.imgur.com/DiHM5Zb.jpg`, `https://k32.kn3.net/5C7060EC5.jpg`, `http://i.imgur.com/DKR1HtB.jpg`]),
    answer: `https://k32.kn3.net/5C7060EC5.jpg`
  },
  {
    type: `2pic`,
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
    type: `1pic`,
    options: [{
      question: `http://trinixy.ru/pics5/20160115/interesnie_photo_23.jpg`,
      answer: `photo`
    }]
  },
  {
    type: `paint`,
    options: new Set([`https://st.kp.yandex.net/im/kadr/1/2/9/kinopoisk.ru-Jack-Nicholson-1297136.jpg`,
      `http://vev.ru/uploads/images/00/04/29/2011/08/07/899bcc.jpg`,
      `http://funpress.ru/uploads/posts/2012-10/1351691961_hiperrealistic-paintings-of-robin-eley-2.jpg`]),
    answer: `http://funpress.ru/uploads/posts/2012-10/1351691961_hiperrealistic-paintings-of-robin-eley-2.jpg`
  },
  {
    type: `2pic`,
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
    type: `1pic`,
    options: [{
      question: `https://s-media-cache-ak0.pinimg.com/originals/31/dc/4f/31dc4f9c572c71190174fb38d82222e1.jpg`,
      answer: `paint`
    }]
  },
  {
    type: `paint`,
    options: new Set([`http://img0.liveinternet.ru/images/attach/c/1//58/904/58904305__MG_8199_sm_.jpg`,
      `http://bestpozitiv.ru/wp-content/uploads/2013/12/samye-krasivye-fotografii-dikix-zhivotnyx-03.jpg`,
      `https://s00.yaplakal.com/pics/pics_original/0/6/9/10056960.jpg`]),
    answer: `https://s00.yaplakal.com/pics/pics_original/0/6/9/10056960.jpg`
  },
  {
    type: `1pic`,
    options: [{
      question: `https://190330.selcdn.ru/prmira/2016/11/7/%D0%BA%D0%B0%D1%80%D0%B0.jpg`,
      answer: `photo`
    }]
  }
];

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

const resultLevel = (type) => {
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
};

const getListStatsTemplate = (data) => {
  return `<ul class="stats">
    ${data.map((score) => resultLevel(score)).join(``)}
    ${new Array(10 - data.length).fill(`<li class="stats__result stats__result--unknown"></li>`)}</ul>`;
};

const userStat = (data) => {
  const stats = `
  <div class="stats">
    ${getListStatsTemplate(data)}
  </div>`;

  return getElementFromTemplate(stats);
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



const copy = (object) => {
  let newObj = Object.assign({}, object);
  for (const key in newObj) {
    if (newObj[key] instanceof Array) {
      newObj[key] = newObj[key].slice();
    }
  }
  return newObj;
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

const game3Template = (data) => {
  return `
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      ${[...data.options].map((option) => `<div class="game__option">
        <img src="${option}" alt="Option 1" width="304" height="455">
      </div>`).join(``)}
    </form>
  </div>`;
};

const element$3 = (level, userDataGame) => {
  let el = getElementFromTemplate(game3Template(level));
  el.querySelector(`.game`).appendChild(userStat(userDataGame.stats));

  const frameSize = {
    width: 304,
    height: 455
  };
  resizeImages(el, frameSize);

  const pictures = Array.prototype.slice.call(el.querySelectorAll(`.game__option`));

  pictures.forEach((pic) => {
    pic.addEventListener(`click`, (ev) => {
      const isCorrectAnswer = ev.target.lastElementChild.src === level.answer;
      nextLevel(userDataGame, isCorrectAnswer);
    });
  });

  return el;
};

const game2Template = (data) => {
  return `
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${data.options[0].question}" alt="Option 1" width="705" height="455">
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
  </div>`;
};

const element$4 = (level, userDataGame) => {
  let el = getElementFromTemplate(game2Template(level));
  el.querySelector(`.game`).appendChild(userStat(userDataGame.stats));

  const frameSize = {
    width: 705,
    height: 455
  };
  resizeImages(el, frameSize);

  const radioBtns = Array.prototype.slice.call(el.querySelectorAll(`input[type=radio]`));

  radioBtns.forEach((radioBtn) => {
    radioBtn.addEventListener(`change`, (ev) => {
      const isCorrectAnswer = ev.target.value === level.options[0].answer;
      nextLevel(userDataGame, isCorrectAnswer);
    });
  });

  return el;
};

const game1Template = (data) => {
  return `
  <div class="game">
    <p class="game__task">Угадайте для каждого изображения фото или рисунок?</p>
    <form class="game__content">
      ${data.options.map((option, i) => `<div class="game__option">
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
  </div>`;
};

const checkQuestion = (options, a1, a2) => {
  return options[0].answer === a1 && options[1].answer === a2;
};

const element$5 = (level, userDataGame) => {
  let el = getElementFromTemplate(game1Template(level));
  el.querySelector(`.game`).appendChild(userStat(userDataGame.stats));

  const frameSize = {
    width: 468,
    height: 458
  };
  resizeImages(el, frameSize);

  const radioBtns = Array.prototype.slice.call(el.querySelectorAll(`input[type=radio]`));

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
        const isCorrectAnswer = checkQuestion(level.options, q1, q2);
        nextLevel(userDataGame, isCorrectAnswer);
      }
    });
  });

  return el;
};

const getAmountTypeAnswer = (dataGame, typeAnswer) => {
  return dataGame.filter((score) => score === typeAnswer).length;
};

const getDetailScores = (dataGame, typeAnswer, typeAnswerScore) => {
  return getAmountTypeAnswer(dataGame, typeAnswer) * typeAnswerScore;
};

const getResultGame = (statUser, indexGame, lives) => {
  const finalScores = countFinalScores(statUser, lives);

  if (finalScores !== FAIL_GAME) {
    return `
    <table class="result__table">
        <tr>
          <td class="result__number">${indexGame}.</td>
          <td colspan="2">
            <ul class="stats">
              ${getListStatsTemplate(statUser)}
            </ul>
          </td>
          <td class="result__points">×&nbsp;${ANSWER_SCORES.RIGHT}</td>
          <td class="result__total">
            ${getDetailScores(statUser, ANSWERS.RIGHT, ANSWER_SCORES.RIGHT)}
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за скорость:</td>
          <td class="result__extra">
            ${getAmountTypeAnswer(statUser, ANSWERS.FAST)}&nbsp;
            <span class="stats__result stats__result--fast"></span>
          </td>
          <td class="result__points">×&nbsp;${ANSWER_SCORES.FAST}</td>
          <td class="result__total">
            ${getDetailScores(statUser, ANSWERS.FAST, ANSWER_SCORES.FAST)}
          </td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">×&nbsp;${ANSWER_SCORES.LIVE}</td>
          <td class="result__total">${lives * ANSWER_SCORES.LIVE}</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Штраф за медлительность:</td>
          <td class="result__extra">
            ${getAmountTypeAnswer(statUser, ANSWERS.SLOW)}&nbsp;
            <span class="stats__result stats__result--slow"></span>
          </td>
          <td class="result__points">×&nbsp;${ANSWER_SCORES.SLOW}</td>
          <td class="result__total">
            ${getDetailScores(statUser, ANSWERS.SLOW, ANSWER_SCORES.SLOW)}
          </td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">
            ${finalScores}
          </td>
        </tr>
      </table>`;
  }

  return `
    <table class="result__table">
      <tr>
        <td class="result__number">${indexGame}.</td>
          <td colspan="2">
            <ul class="stats">
              ${getListStatsTemplate(statUser)}
            </ul>
          </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
};

const getTitleStat = (stats, lives) => {
  const finalScores = countFinalScores(stats, lives);
  return (finalScores === FAIL_GAME) ? `<h1>Поражение!</h1>` : `<h1>Победа!</h1>`;
};

const statsTemplate = (dataGames) => {
  const element = `
  <div class="result">
    ${ getTitleStat(dataGames[0].stats, dataGames[0].lives) }
    ${ dataGames.map((game, i) => getResultGame(game.stats, i + 1, game.lives)).join(``)}
  </div>`;
  return getElementFromTemplate(element);
};

const gameTemplates = {
  '2pic': element$5,
  '1pic': element$4,
  'paint': element$3
};

const nextLevel = (userDataGame, isCorrectAnswer) => {
  const nextLevelDataGame = copy(userDataGame);
  if (isCorrectAnswer) {
    nextLevelDataGame.level++;
    nextLevelDataGame.stats.push(1);
  } else if (isCorrectAnswer === false) {
    nextLevelDataGame.level++;
    nextLevelDataGame.lives--;
    nextLevelDataGame.stats.push(0);
  }


  if (nextLevelDataGame.lives && nextLevelDataGame.level < 10) {
    const levelData = questionsList[nextLevelDataGame.level];
    const template = gameTemplates[levelData.type](levelData, nextLevelDataGame);

    return changeTemplate(template, `game`, nextLevelDataGame);
  } else {
    return changeTemplate(statsTemplate([nextLevelDataGame]), `on`, nextLevelDataGame);
  }
};

const rulesTemplate = `
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
  </div>`;

const element$2 = getElementFromTemplate(rulesTemplate);

const rulesInput = element$2.querySelector(`.rules__input`);
const rulesBtn = element$2.querySelector(`.rules__button`);
rulesInput.addEventListener(`keyup`, () => {
  rulesBtn.disabled = rulesInput.value.length === 0;
});

rulesBtn.addEventListener(`click`, (event) => {
  event.preventDefault();
  nextLevel(initialGame);
});

const greetingTemplate = `
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
  </div>`;

const element$1 = getElementFromTemplate(greetingTemplate);

element$1.querySelector(`.greeting__continue`).addEventListener(`click`, (event) => {
  event.preventDefault();
  changeTemplate(element$2, `on`);
});

const headerGameTemplate = (data) => {
  return `
   <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    <h1 class="game__timer">${data.time}</h1>
    <div class="game__lives">
      ${new Array(3 - data.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      ${new Array(data.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    </div>
  </header>`;
};

const headerTemplate = `
  <header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
  </header>`;

const element = (data, mode) => {
  if (mode) {
    const template = (mode === `game`) ? headerGameTemplate(data) : headerTemplate;
    const el = getElementFromTemplate(template);

    el.querySelector(`.back`).addEventListener(`click`, (event) => {
      event.preventDefault();
      changeTemplate(element$1);
    });
    return el;
  } else {
    return false;
  }
};

const mainScreen = document.querySelector(`main`);

const changeTemplate = (template, modeHeader, dataGame) => {
  mainScreen.innerHTML = ``;
  if (modeHeader) {
    const headerTemplate = element(dataGame, modeHeader);
    mainScreen.appendChild(headerTemplate);
  }
  mainScreen.appendChild(template);
  mainScreen.appendChild(footer);
};

const statsTemplate$2 = `
  <div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;

const element$6 = getElementFromTemplate(statsTemplate$2);

element$6.querySelector(`.intro__asterisk`).addEventListener(`click`, (event) => {
  event.preventDefault();
  changeTemplate(element$1);
});

changeTemplate(element$6);

}());

//# sourceMappingURL=main.js.map
