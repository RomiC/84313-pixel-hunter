import {initialGame} from '../../data/game-data.js';
import nextLevel from '../../data/next-level.js';
import RulesView from './rules-view.js';

const rules = new RulesView();
rules.showNextLevel = () => {
  nextLevel(null, initialGame);
};

export default () => rules;

