import IntroScreen from './screens/intro/intro.js';
import GreetingScreen from './screens/greeting/greeting.js';
import RulesScreen from './screens/rules/rules.js';
import StatsScreen from './screens/stat-games/stat-game.js';
import gameScreen from './screens/game-screen.js';

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
    const game = gameScreen();
    game.init();
  }

  static showStats(stats) {
    StatsScreen.init(stats);
  }
}
