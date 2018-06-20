import React, { Component, PropTypes } from 'react';
import style from './WagerItem.css';

import { calcHomeSpreadWinP, calcBetValue } from '../utils/helpers';

export default class WagerItem extends Component {

  static propTypes = {
    game: PropTypes.object.isRequired,
    wager: PropTypes.object.isRequired,
    deleteWager: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props.game) !== JSON.stringify(nextProps.game));
  }

  handleDelete = () => {
    const { wager, deleteWager } = this.props;

    deleteWager(wager.gameId);
  };

  render() {
    const { game, wager } = this.props;
    const awayScore = game['away'] || '-';
    const homeScore = game['home'] || '-';
    const dateTime = game['date-time'] || '-';

    const pointSpread = wager.pointSpread === 0 ? 'ML' : wager.pointSpread;

    const gameStarted = (document.getElementById(game.id).classList.contains('live') ||
      document.getElementById(game.id).classList.contains('final')) &&
      document.getElementById(game.id).getElementsByClassName('date-time')[0]
        .innerText !== 'POSTPONED';

    let betValue = 0;
    let teamWinP = '';

    if (gameStarted && dateTime !== "Delayed" && dateTime !== "POSTPONED" &&
      awayScore !== '-' && homeScore !== '-' && dateTime !== '-') {
      const homeWinP = calcHomeSpreadWinP(parseInt(awayScore), parseInt(homeScore), dateTime);
      teamWinP = wager.team === game.homeTeam ? homeWinP : Math.round((100 - homeWinP) * 100) / 100;
      betValue = calcBetValue(game, wager);
    }

    const prefix = betValue === 0 ? '$' : betValue > 0 ? '+$' : '-$';
    const displayVal = betValue === parseInt(betValue) ?
      Math.abs(betValue) : Math.abs(betValue).toFixed(2);

    return (
      <li className={ style.normal }>
        <div className={ style.wagerItemHeader } >
          <div className={ style.wagerItemHeaderRow } >
            <span>
              { wager.team }
            </span>
            <button
              className={ style.destroy }
              onClick={ this.handleDelete }
            />
          </div>
          <div className={ style.wagerItemHeaderRow } >
            <span>
              { pointSpread }
            </span>
            <span>
              { wager.odds > 0 ? '+' + wager.odds : wager.odds }
            </span>
            <span>$
              { wager.amount }
            </span>
            <span>
              { prefix + displayVal }
            </span>
          </div>
        </div>

        <label>
          <div>
            <div>
              { game.awayTeam }
            </div>
            <div>
              { game.homeTeam }
            </div>
          </div>

          <div>
            { gameStarted &&
              <div>
                <div>
                  { game.away || '-' }
                </div>
                <div>
                  { game.home || '-' }
                </div>
              </div>
            }
          </div>

          <div>
            { gameStarted &&
              <div>
                <div>
                  { game['date-time'] || '-' }
                </div>
                <div>
                  { teamWinP + '%' }
                </div>
              </div>
            }
          </div>
        </label>
      </li>
    );
  }
}