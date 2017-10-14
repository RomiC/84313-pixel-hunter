const RIGHT_ANSWER = 1;
const FAST_ANSWER = 2;
const SLOW_ANSWER = 3;

const RIGHT_ANSWER_SCORE = 100;
const FAST_ANSWER_SCORE = RIGHT_ANSWER_SCORE + 50;
const SLOW_ANSWER_SCORE = RIGHT_ANSWER_SCORE - 50;
const LIVE_SCORE = 50;

const amountAnswers = 10;


const countFinallyScores = (answers, lives) => {
  let finallyScores = 0;
  if (answers.length < amountAnswers) {
    return -1;
  } else {
    answers.forEach((answer) => {
      switch (answer) {
        case RIGHT_ANSWER:
          finallyScores = finallyScores + RIGHT_ANSWER_SCORE;
          break;
        case FAST_ANSWER:
          finallyScores = finallyScores + FAST_ANSWER_SCORE;
          break;
        case SLOW_ANSWER:
          finallyScores = finallyScores + SLOW_ANSWER_SCORE;
          break;
      }
    });
    finallyScores = finallyScores + lives * LIVE_SCORE;
    return finallyScores;
  }
};

const createTimer = (timeInSecond) => {
  let second = 0;
  if (timeInSecond > 0) {
    second = timeInSecond;
  }

  const timer = {
    time: second,
    tick: () => {
      if (timer.time > 1) {
        return timer.time--;
      }

      timer.time = 0;
      return `Timer stopped`;
    }
  };
  return timer;
};

export {countFinallyScores, createTimer};
