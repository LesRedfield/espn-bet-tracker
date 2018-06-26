import React, { Component, PropTypes } from 'react';
import GameItem from './GameItem';
import style from './GamesList.css';

export default class GamesList extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    gameActions: PropTypes.object.isRequired,
    // addWager: PropTypes.func.isRequired,
    addBet: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { games, gameActions, addBet } = this.props;

    const activeGames = Object.keys(games).filter(gameId => {
      return document.getElementById(gameId).classList.contains('live');
    }).map(gameId => {
      return games[gameId];
    });

    const completedGames = Object.keys(games).filter(gameId => {
      return document.getElementById(gameId).classList.contains('final');
    }).map(gameId => {
      return games[gameId];
    });

    const pendingGames = Object.keys(games).filter(gameId => {
      return (!document.getElementById(gameId).classList.contains('final') &&
              !document.getElementById(gameId).classList.contains('live'));
    }).map(gameId => {
      return games[gameId];
    });

    const listNames = ["Active", "Completed", "Pending"];
    const gameLists = [activeGames, completedGames, pendingGames];

    const gameListElements = (
      gameLists.map((gameList, idx) =>
        gameList.length > 0 ? (
          <div key={ idx } className={ style.gameListRow }>
            <h2>{ listNames[idx] }</h2>
            <ul className={ style.gameList }>
              {
                gameList.map(game =>
                  <GameItem
                    key={ game.id }
                    game={ game }
                    { ...gameActions }
                    // addWager={ addWager }
                    addBet={ addBet }
                  />
                )
              }
            </ul>
          </div>
        ) : (
          <div key={ idx }/>
        )
      )
    );

    return (
      <div className={ style.gameListOuter } >
        <h1>Today's Games</h1>
        <div className={ style.gameListInner } >
          { gameListElements }
        </div>
      </div>
    );
  }
}