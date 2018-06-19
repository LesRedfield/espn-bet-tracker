import React, { Component, PropTypes } from 'react';

import style from './WagerItem.css';

export default class WagerItem extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    wager: PropTypes.object.isRequired,
    deleteWager: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }

  handleDelete = () => {
    const { game, deleteWager } = this.props;

    deleteWager(wager.gameId);
  };

  render() {
    const { game, wager } = this.props;

    const pointSpread = wager.pointSpread === 0 ? "ML" : wager.pointSpread;

    return (
      <li className={ style.normal }>

        <label>
          <div>
            <span>
              { wager.team }
            </span>
            <span>
              { pointSpread }
            </span>
            <span>
              { wager.odds }
            </span>
            <span>
              { wager.amount }
            </span>
          </div>

          <div>
            <span>
              { game.awayTeam }
            </span>
            <span>
              { game.away || '-' }
            </span>
            <span>
              { game.homeTeam }
            </span>
            <span>
              { game.home || '-' }
            </span>
          </div>
        </label>

        <button
          className={ style.destroy }
          onClick={ this.handleDelete }
        />
      </li>
    );
  }
}