import Level3ImgsView from './level-type-3-images-view.js';
import nextLevel from '../../data/next-level.js';

export default (levelData) => {
  const level3Imgs = new Level3ImgsView(levelData);
  level3Imgs.showNextLevel = () => {
    nextLevel(level3Imgs._isCorrectAnswer);
  };

  return level3Imgs;
};
