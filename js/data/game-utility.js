import {ANSWERS, ANSWER_SCORES, FAIL_GAME} from './constants.js';

const amountAnswers = 10;

export const countFinalScores = (answers, lives) => {
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

export const createTimer = (timeInSecond, msg = ``) => {
  const timer = {
    time: timeInSecond > 0 ? timeInSecond : 0,
    tick() {
      const value = timer.time - 1;
      const msgTick = (value === 0) ? `Timer stopped` : ``;
      return createTimer(value > 0 ? value : 0, msgTick);
    },
    msg
  };
  return timer;
};

export const tick = (game, timeInSec) => {
  game = copy(game);
  game.time = timeInSec || game.time++;
  return game;
};

export const copy = (object) => {
  let newObj = Object.assign({}, object);
  for (const key in newObj) {
    if (newObj[key] instanceof Array) {
      newObj[key] = newObj[key].slice();
    }
  }
  return newObj;
};


export const nextLevel = (gameData) => {
  const game = copy(gameData);
  game.level++;
  return game;
};

export const spendLives = (gameData) => {
  const game = copy(gameData);
  game.lives--;
  if (game.lives < 0) {
    throw new RangeError(`Can't set negative lives`);
  }
  return game;
};


export const setLastLevelStat = (gameData, answer) => {
  const game = copy(gameData);
  game.stats.push(answer);
  return game;
};


export const resize = (frame, given) => {
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


export const resizeImages = (el) => {
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


