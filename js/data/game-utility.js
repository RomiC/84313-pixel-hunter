import {ANSWERS, ANSWER_SCORES, GAME} from './constants.js';

export const countFinalScores = (answers, lives) => {
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

export const tick = (game) => {
  const gameStat = copy(game);
  gameStat.time = gameStat.time + 1;
  return gameStat;
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


