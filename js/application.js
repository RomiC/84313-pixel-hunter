import IntroScreen from './screens/intro/intro.js'
import GreetingScreen from './screens/greeting/greeting.js'
import RulesScreen from './screens/rules/rules.js'

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
}
