import React, { Component, PropTypes } from 'react';
import GameItem from './GameItem';
import style from './MainSection.css';
import _ from "lodash";

export default class MainSection extends Component {

  static propTypes = {
    games: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const gameAddButtons = document.getElementsByClassName('game-add-button');

    Array.from(gameAddButtons).forEach(gameAddButton => {

      const gameId = gameAddButton.dataset.gameId;

      gameAddButton.addEventListener('click', this.handleSave.bind(this, gameId));
    });
  }

  handleSave = (gameId) => {
    // const teamNames = gameTable.getElementsByClassName('sb-team-short');
    //
    // const awayTeamName = teamNames[0].innerText;
    // const homeTeamName = teamNames[1].innerText;

    this.props.actions.addGame(gameId);
  }

  render() {
    const { games, actions } = this.props;

    return (
      <section className={ style.main }>
        <h1>New Wagers</h1>
        <ul className={ style.gameList }>
          {
            _.map(games, (game) =>
              <GameItem key={ game.id } game={ game } { ...actions } />
            )
          }
        </ul>
      </section>
    );
  }
}
