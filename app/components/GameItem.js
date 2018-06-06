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

  handleSave = (text) => {
    const { game, deleteGame, editGame } = this.props;
    if (text.length === 0) {
      deleteGame(game.id);
    } else {
      editGame(game.id, text);
    }
    this.setState({ editing: false });
  };

  handleDelete = () => {
    const { game, deleteGame } = this.props;
    deleteGame(game.id);
  };

  render() {
    const { game } = this.props;

    const element = (
      <div className={style.view}>
        <label>
          {game.text}
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
