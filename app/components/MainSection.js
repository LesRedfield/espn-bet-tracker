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
    const gameContainers = document.getElementById('events').
                                    getElementsByClassName('scoreboard');

    Array.from(gameContainers).forEach(function(gameContainer) {

      const gameId = gameContainer.id;

      this.props.actions.addGame(gameId);
    }, this);
  }

  render() {
    const { games, actions } = this.props;

    return (
      <section className={ style.main }>
        <h1>Today's Games</h1>
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
