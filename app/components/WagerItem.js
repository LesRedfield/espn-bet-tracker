import React, { Component, PropTypes } from 'react';
import style from './WagerItem.css';

import { calcHomeSpreadWinP, calcWagerValue } from '../utils/helpers';

export default class WagerItem extends Component {

  static propTypes = {
    wagerObj: PropTypes.object.isRequired,
    deleteWager: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
  }

  shouldComponentUpdate(nextProps) {
    return (JSON.stringify(this.props) !== JSON.stringify(nextProps));
  }

  handleDelete = () => {
    const { wagerObj, deleteWager } = this.props;

    deleteWager(wagerObj.wagerId);
  };

  render() {
    const { wagerObj } = this.props;
    const { betObjs, odds, amount } = wagerObj;

    const displayBetObjs = betObjs.map(betObj => {
      const { side, game } = betObj;
      const betOdds = betObj.odds  > 0 ? '+' + betObj.odds : betObj.odds;;

      const awayScore = game['away'] || '-';
      const homeScore = game['home'] || '-';
      const dateTime = game['date-time'] || '-';
      const outs = game['outs'] || '-';
      const bases = game['bases'] || '';

      const gameStarted = (document.getElementById(game.id).classList.contains('live') ||
        document.getElementById(game.id).classList.contains('final')) &&
        document.getElementById(game.id).getElementsByClassName('date-time')[0]
          .innerText !== 'POSTPONED';

      let teamWinP = 50;

      if (gameStarted && dateTime !== "Delayed" && dateTime !== "POSTPONED" &&
        awayScore !== '-' && homeScore !== '-' && dateTime !== '-') {
        const homeWinP = calcHomeSpreadWinP(parseInt(awayScore), parseInt(homeScore), dateTime, parseInt(outs), bases);
        teamWinP = side === game.homeTeam ? homeWinP : Math.round((100 - homeWinP) * 100) / 100;
      }

      return {
        gameStarted,
        betOdds,
        game,
        side,
        teamWinP
      }
    });

    const { wagerValue, wagerWinP } = calcWagerValue(wagerObj, true);

    const prefix = wagerValue === 0 ? '$' : wagerValue > 0 ? '+$' : '-$';
    const displayVal = wagerValue === parseInt(wagerValue) ?
      Math.abs(wagerValue) : Math.abs(wagerValue).toFixed(2);

    const numBets = displayBetObjs.length;
    const isParlay = numBets > 1;
    const displayOdds = odds > 0 ? '+' + odds : odds;
    const wagerClass = wagerValue > 0 ? style.winner : wagerValue < 0 ? style.loser : style.push;

    const header = isParlay ? (
      <div className={ style.wagerItemHeader } >
        <div className={ style.wagerItemHeaderRow } >
          <span className={ style.wagerValue }>
            { prefix + displayVal }
          </span>
          <span className={ style.wagerDetails }>
            <div className={ style.wagerType }>
              { numBets + '-TEAM PARLAY' }
            </div>
            <div className={ style.wagerMetrics }>
              <span>
                { wagerWinP + '%' }
              </span>
              <span>$
                { amount }
              </span>
              <span>
                { odds > 0 ? '+' + odds : odds }
              </span>
            </div>
          </span>
          <button className={ style.destroy }
                  onClick={ this.handleDelete } >X
          </button>
        </div>
      </div>
    ) : (
      <div className={ style.wagerItemHeader } >
        <div className={ style.wagerItemHeaderRow } >
          <span className={ style.wagerValue }>
            { prefix + displayVal }
          </span>
          <span className={ style.wagerDetails }>
            <div className={ style.wagerType }>
              STRAIGHT BET
            </div>
            <div className={ style.wagerMetrics }>
              <span>
                { wagerWinP + '%' }
              </span>
              <span>$
                { amount }
              </span>
              <span>
                { odds > 0 ? '+' + odds : odds }
              </span>
            </div>
          </span>
          <button className={ style.destroy }
                  onClick={ this.handleDelete } >X
          </button>
        </div>
      </div>
    );

    const betList = displayBetObjs.map((displayBetObj, idx) => {
      let betClass = style.betItem;
      if (displayBetObj.teamWinP === 100) {
        betClass += (' ' + style.winner);
      } else if (displayBetObj.teamWinP === 0) {
        betClass += (' ' + style.loser);
      }

      let awayClass = '';
      let homeClass = '';
      if (displayBetObj.game.awayTeam === displayBetObj.side) {
        awayClass = style.betTeam;
      } else if (displayBetObj.game.homeTeam === displayBetObj.side) {
        homeClass = style.betTeam;
      }

      return (
        <div className={betClass}
             key={ idx }>
          <label>
            <div>
              <div className={ awayClass } >
                {
                  displayBetObj.game.awayTeam +
                  (displayBetObj.game.awayTeam === displayBetObj.side ? ' (' + displayBetObj.betOdds + ')' : '')
                }
              </div>
              <div className={ homeClass } >
                {
                  displayBetObj.game.homeTeam +
                  (displayBetObj.game.homeTeam === displayBetObj.side ? ' (' + displayBetObj.betOdds + ')' : '')
                }
              </div>
            </div>

            <div>
              {displayBetObj.gameStarted &&
              <div>
                <div className={ awayClass } >
                  {displayBetObj.game.away || '-'}
                </div>
                <div className={ homeClass } >
                  {displayBetObj.game.home || '-'}
                </div>
              </div>
              }
            </div>

            <div>
              {displayBetObj.gameStarted &&
              <div>
                <div>
                  {displayBetObj.game['date-time'] || '-'}
                </div>
                <div>
                  {displayBetObj.teamWinP + '%'}
                </div>
              </div>
              }
            </div>
          </label>
        </div>
      );

    });

    return (
      <li className={ wagerClass }>
        { header }
        <div>
          {betList}
        </div>
      </li>
    );
  }
}