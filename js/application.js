import IntroScreen from './screens/intro/intro.js';
import GreetingScreen from './screens/greeting/greeting.js';
import RulesScreen from './screens/rules/rules.js';
import StatsScreen from './screens/stat-games/stat-game.js';
import gameScreen from './screens/levels/game-screen.js';

const controllerId = {
  WELCOME: ``,
  RULES: `rules`,
  GREETING: `greeting`,
  GAME: `game`,
  STATS: `stats`
};

const routes = {
  [controllerId.WELCOME]: IntroScreen,
  [controllerId.GREETING]: GreetingScreen,
  [controllerId.RULES]: RulesScreen,
  [controllerId.GAME]: gameScreen(),
  [controllerId.STATS]: StatsScreen
};

export default class Application {
  static init() {
    const changeHashHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`?`);
      this.changeHash(id, data);
    };
    window.onhashchange = changeHashHandler;
    changeHashHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];
    if(controller) {
      controller.init(data);
    }
  }

  static showWelcome() {
    location.hash = controllerId.WELCOME;
  }

  static showGreeting() {
    location.hash = controllerId.GREETING;
  }

  static showRules() {
    location.hash = controllerId.RULES;
  }

  static showGame() {
    location.hash = controllerId.GAME;
  }

  static showStats(stats) {
    location.hash = `${controllerId.STATS}?${this.hashState(stats)}`;
  }
}
