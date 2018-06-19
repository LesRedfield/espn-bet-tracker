import React, { Component, PropTypes } from 'react';
import GameItem from './GameItem';
import style from './GamesList.css';
import _ from "lodash";

// import * as Papa from 'papaparse';
import { winP } from '../constants/WinProbs';

export default class GamesList extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    gameActions: PropTypes.object.isRequired,
    addWager: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  render() {
    // debugger
    const { games, gameActions, addWager } = this.props;
    // const { winP } = this.state;

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

    const listNames = ["Active Games", "Completed Games", "Pending Games"];
    const gameLists = [activeGames, completedGames, pendingGames];

    const gameListElements = (
      gameLists.map((gameList, idx) =>
        gameList.length > 0 ? (
          <div key={ idx } className={ style.gameListColumn }>
            <h2>{ listNames[idx] }</h2>
            <ul className={ style.gameList }>
              {
                gameList.map(game =>
                  <GameItem key={ game.id } game={ game } winP={ winP } { ...gameActions } addWager={ addWager } />
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
      <div>
        <h1>Today's Games</h1>
        <div className={ style.gameListContainer }>
          { gameListElements }
        </div>
      </div>
    );
  }
}