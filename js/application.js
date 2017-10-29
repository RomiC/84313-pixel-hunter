import IntroScreen from './screens/intro/intro.js';
import GreetingScreen from './screens/greeting/greeting.js';
import RulesScreen from './screens/rules/rules.js';
import statsScreen from './screens/stat-games/stat-game.js';
import GameScreen from './data/game-screen.js';

export default class Application {
  static showWelcome() {
    IntroScreen.init();
  }

  static showGreeting() {
    GreetingScreen.init();
  }

  static showRules() {
    RulesScreen.init();
  }

  static showGame() {
    GameScreen.init();
  }

  static showStats(stats) {
    statsScreen.init(stats);
  }
}
