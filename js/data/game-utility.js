const RIGHT_ANSWER = 1;
const FAST_ANSWER = 2;
const SLOW_ANSWER = 3;

const RIGHT_ANSWER_SCORE = 100;
const FAST_ANSWER_SCORE = RIGHT_ANSWER_SCORE + 50;
const SLOW_ANSWER_SCORE = RIGHT_ANSWER_SCORE - 50;
const LIVE_SCORE = 50;

const amountAnswers = 10;


const countFinallyScores = (answers, lives) => {
  if (answers.length < amountAnswers) {
    return -1;
  } else {
    let finallyScores = answers.reduce((sum, answer) => {
      switch (answer) {
        case RIGHT_ANSWER:
          return sum + RIGHT_ANSWER_SCORE;
        case FAST_ANSWER:
          return sum + FAST_ANSWER_SCORE;
        case SLOW_ANSWER:
          return sum + SLOW_ANSWER_SCORE;
      }

      return sum;
    }, 0);
    return finallyScores + lives * LIVE_SCORE;
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
