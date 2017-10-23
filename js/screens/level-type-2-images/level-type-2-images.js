import Level2ImgsView from './level-type-2-images-view.js';
import nextLevel from '../../data/next-level.js';

export default (levelData) => {
  const level2Imgs = new Level2ImgsView(levelData);
  level2Imgs.showNextLevel = () => {
    nextLevel(level2Imgs._isCorrectAnswer);
  };

  return level2Imgs;
};
