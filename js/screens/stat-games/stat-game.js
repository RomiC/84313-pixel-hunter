import StatGameView from './stat-games-view.js';
import changeTemplate from '../../change-template.js';
import header from '../../templates/header/header.js';
import {getData} from '../../data/game-load.js';
import {PROJECT_ID} from '../../data/constants.js';

class StatGameScreen {
  init(userName) {
    const showView = (response) => {
      const games = [];
      response.forEach((game) => {
        if (game.project === PROJECT_ID) {
          games.push(game);
        }
      });
      const screen = new StatGameView(games);

      const headerScreen = header(`on`).init();
      return changeTemplate(screen.element, headerScreen);
    };

    getData(`stats/${userName}`, showView);
  }
}

export default new StatGameScreen();
