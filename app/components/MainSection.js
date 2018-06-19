import React, { Component, PropTypes } from 'react';
// import GameItem from './GameItem';
import GamesList from './GamesList';
import Dashboard from './Dashboard';
import style from './MainSection.css';
// import _ from "lodash";

export default class MainSection extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    wagers: PropTypes.object.isRequired,
    gameActions: PropTypes.object.isRequired,
    wagerActions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const gameContainers = document.getElementById('events').
    getElementsByClassName('scoreboard');

    Array.from(gameContainers).forEach(function(gameContainer) {

      const id = gameContainer.id;

      const teamNames = gameContainer.getElementsByClassName('sb-team-short');

      const awayTeam = teamNames[0].innerText;
      const homeTeam = teamNames[1].innerText;

      this.props.gameActions.addGame(id, awayTeam, homeTeam);
    }, this);
  }

  render() {
    const { games, wagers, gameActions, wagerActions } = this.props;

    return (
      <section className={ style.main }>
        <Dashboard games={ games } wagers={ wagers } wagerActions={ wagerActions }/>
        <GamesList games={ games } gameActions={ gameActions } addWager={ wagerActions.addWager }/>

      </section>
    );
  }
}
