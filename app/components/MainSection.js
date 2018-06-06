import React, { Component, PropTypes } from 'react';
import GameItem from './GameItem';
import style from './MainSection.css';


export default class MainSection extends Component {

  static propTypes = {
    games: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { games, actions } = this.props;

    return (
      <section className={style.main}>
        <h1>Wagers</h1>
        <ul className={style.gameList}>
          {games.map(game =>
            <GameItem key={game.id} game={game} {...actions} />
          )}
        </ul>
      </section>
    );
  }
}
