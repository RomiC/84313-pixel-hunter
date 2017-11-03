import assert from 'assert';
import {countFinalScores, resize} from './game-utility.js';
import {GAME} from './constants.js';

describe(`game data test`, () => {
  describe(`test function count finally scores`, () => {
    it(`should return -1 when player didn't answer ${GAME.AMOUNT_GAME_LEVELS} question`, () => {
      assert.equal(countFinalScores([1, 1, 1, 1, 1], 0), GAME.FAIL);
    });

    it(`should return 1150 when player answer ${GAME.AMOUNT_GAME_LEVELS} question(not fast, not slow), didn't fail`, () => {
      assert.equal(countFinalScores([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 3), 1150);
    });

    it(`should return 1150 when player answer ${GAME.AMOUNT_GAME_LEVELS} question(2 fast, 2 slow), didn't fail`, () => {
      assert.equal(countFinalScores([1, 1, 1, 1, 2, 1, 2, 1, 3, 3], 3), 1150);
    });

    it(`should return 1100 when player answer ${GAME.AMOUNT_GAME_LEVELS} question(2 fast, 3 slow), didn't fail`, () => {
      assert.equal(countFinalScores([1, 1, 1, 1, 2, 1, 2, 3, 3, 3], 3), 1100);
    });

    it(`should return 1050 when player answer ${GAME.AMOUNT_GAME_LEVELS} question(2 fast, 2 slow), 2 fail`, () => {
      assert.equal(countFinalScores([1, 1, 1, 1, 2, 1, 2, 1, 3, 3], 1), 1050);
    });
  });
});


const createTestForFrame = (frame) => {
  const assertRatio = (given, expected) => {
    const actual = resize(frame, given);
    assert.deepEqual(actual, expected);
  };

  const createTest = (expected, multiplier) => {
    const given = {
      width: Math.floor(expected.width * multiplier),
      height: Math.floor(expected.height * multiplier)
    };
    it(`shrink ${multiplier}x: ${given.width}x${given.height} => ${expected.width}x${expected.height}`, () => {
      assertRatio(given, expected);
    });
  };

  const sequence = (expected) => {
    createTest(expected, 8);
    createTest(expected, 7);
    createTest(expected, 5);
    createTest(expected, 4);
    createTest(expected, 3);
    createTest(expected, 2);
    createTest(expected, 1);
  };

  describe(`Resize into frame: ${frame.width}x${frame.height}`, () => {

    describe(`when "width === height"`, () => {
      sequence({width: frame.width, height: frame.height});
    });

    describe(`when "width > height"`, () => {
      sequence({width: frame.width, height: Math.floor(frame.height / 2)});
    });

    describe(`when "width < height"`, () => {
      sequence({width: Math.floor(frame.width / 2), height: frame.height});
    });

  });
};

createTestForFrame({width: 256, height: 256});
createTestForFrame({width: 256, height: 128});

createTestForFrame({width: 468, height: 458});
createTestForFrame({width: 705, height: 455});
createTestForFrame({width: 304, height: 455});
