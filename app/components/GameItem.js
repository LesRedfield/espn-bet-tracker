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

  componentDidMount() {
    const dateTimeContainer = this.props.game.gameTable.getElementsByClassName('date-time')[0];

    const config = { attributes: true, childList: true };

    const id = this.props.game.id;

    const oldDateTime = this.props.game.dateTime;

    if (oldDateTime === 'dateTime') {
      this.props.editGame(id, dateTimeContainer.innerText);
    }
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
          <span>{ game.dateTime }</span>
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
