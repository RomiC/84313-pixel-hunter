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

const initialGame = Object.freeze({
  level: 0,
  lives: 3,
  time: 30,
  stats: []
});

export {ANSWERS, ANSWER_SCORES, GAME, TIME, initialGame};
