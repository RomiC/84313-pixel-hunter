import Level1ImgView from './level-type-1-image-view.js';
import nextLevel from '../../data/next-level.js';

export default (levelData) => {
  const level1Img = new Level1ImgView(levelData);
  level1Img.showNextLevel = () => {
    nextLevel(level1Img._isCorrectAnswer);
  };

  return level1Img;
};
