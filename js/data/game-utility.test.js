import assert from 'assert';
import {countFinallyScores, createTimer} from './game-utility.js';

describe(`game data test`, () => {
  describe(`test function count finally scores`, () => {
    it(`should return -1 when player didn't answer 10 question`, () => {
      assert.equal(countFinallyScores([1, 1, 1, 1, 1], 0), -1);
    });

    it(`should return 1150 when player answer 10 question(not fast, not slow), didn't fail`, () => {
      assert.equal(countFinallyScores([1, 1, 1, 1, 1, 1, 1, 1, 1, 1], 3), 1150);
    });

    it(`should return 1150 when player answer 10 question(2 fast, 2 slow), didn't fail`, () => {
      assert.equal(countFinallyScores([1, 1, 1, 1, 2, 1, 2, 1, 3, 3], 3), 1150);
    });

    it(`should return 1100 when player answer 10 question(2 fast, 3 slow), didn't fail`, () => {
      assert.equal(countFinallyScores([1, 1, 1, 1, 2, 1, 2, 3, 3, 3], 3), 1100);
    });

    it(`should return 1050 when player answer 10 question(2 fast, 2 slow), 2 fail`, () => {
      assert.equal(countFinallyScores([1, 1, 1, 1, 2, 1, 2, 1, 3, 3], 1), 1050);
    });
  });


  describe(`test function create timer`, () => {
    it(`define time in timer`, () => {
      const newTimer = createTimer(3);
      assert.equal(newTimer.time, 3);
    });

    it(`don't create time less 0`, () => {
      const newTimer = createTimer(-5);
      assert.equal(newTimer.time, 0);
    });

    it(`timer can tick`, () => {
      const newTimer = createTimer(3);
      newTimer.tick();
      assert.equal(newTimer.time, 2);
    });

    it(`timer message`, () => {
      const newTimer = createTimer(3);
      newTimer.tick();
      newTimer.tick();
      assert.equal(newTimer.tick(), `Timer stopped`);
      assert.equal(newTimer.time, 0);
    });

    it(`timer can't less 0`, () => {
      const newTimer = createTimer(3);
      newTimer.tick();
      newTimer.tick();
      newTimer.tick();
      newTimer.tick();
      newTimer.tick();
      assert.equal(newTimer.time, 0);
    });


  });

});
