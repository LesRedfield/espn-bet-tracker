import React, { Component, PropTypes } from 'react';
import GameItem from './GameItem';
import style from './GamesList.css';
import _ from "lodash";

import * as Papa from 'papaparse';
import * as winProbs from '../constants/WinProbs';

export default class GamesList extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    gameActions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);

    const results = Papa.parse(winProbs['WIN_PROBS'], {
      header: true,
      dynamicTyping: true
    });

    const winP = {};

    results.data.forEach(row => {
      const innBaseOut = {};
      for (let netHomeScore = -15; netHomeScore < 16; netHomeScore++) {
        innBaseOut[netHomeScore] = row[netHomeScore];
      }

      winP[row['InnBaseOut']] = innBaseOut;
    });

    this.state = {
      winP
    };
  }

  componentDidMount() {

    // const gameContainers = document.getElementById('events').
    // getElementsByClassName('scoreboard');
    //
    // Array.from(gameContainers).forEach(function(gameContainer) {
    //
    //   const id = gameContainer.id;
    //
    //   const teamNames = gameContainer.getElementsByClassName('sb-team-short');
    //
    //   const awayTeam = teamNames[0].innerText;
    //   const homeTeam = teamNames[1].innerText;
    //
    //   this.props.actions.addGame(id, awayTeam, homeTeam);
    // }, this);
  }

  render() {
    // debugger
    const { games, gameActions } = this.props;
    const { winP } = this.state;

    // debugger

    return (
      <div>
        <h1>Today's Games</h1>
        <ul className={ style.gameList }>
          {
            _.map(games, (game) =>
              <GameItem key={ game.id } game={ game } winP={ winP } { ...gameActions } />
            )
          }
        </ul>
      </div>
    );
  }
}