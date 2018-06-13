import React, { Component, PropTypes } from 'react';
import GameItem from './GameItem';
import style from './GamesList.css';
import _ from "lodash";

export default class GamesList extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
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
    const { games, actions } = this.props;

    // debugger

    return (
      <div>
        <h1>Today's Games</h1>
        <ul className={ style.gameList }>
          {
            _.map(games, (game) =>
              <GameItem key={ game.id } game={ game } { ...actions } />
            )
          }
        </ul>
      </div>
    );
  }
}