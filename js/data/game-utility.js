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

export const copy = (object) => {
  let newObj = Object.assign({}, object);
  for (const key in newObj) {
    if (newObj[key] instanceof Array) {
      newObj[key] = newObj[key].slice();
    }
  }
  return newObj;
};

export const resize = (frame, given) => {
  let pictureWidth, pictureHeight, proportion;

  if (given.width > given.height) {
    pictureWidth = frame.width;
    proportion = frame.width / given.width;
    pictureHeight = given.height * proportion;
  } else {
    pictureHeight = frame.height;
    proportion = frame.height / given.height;
    pictureWidth = given.width * proportion;
  }

  return {
    width: pictureWidth,
    height: pictureHeight
  }
};
