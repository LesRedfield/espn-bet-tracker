import React, { Component, PropTypes } from 'react';
import style from './GameItem.css';

export default class GameItem extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    editGame: PropTypes.func.isRequired,
    deleteGame: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  handleDelete = () => {
    const { game, deleteGame } = this.props;
    deleteGame(game.id);
  };

  render() {
    const { game } = this.props;

    const element = (
      <div className={style.view}>
        <label>
          <span>{ game.teamName }</span>
          <span>{ game.gameState }</span>
        </label>
        <button
          className={style.destroy}
          onClick={this.handleDelete}
        />
      </div>
    );


    return (
      <li>
        {element}
      </li>
    );
  }
}
