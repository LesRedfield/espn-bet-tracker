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
    return (JSON.stringify(this.props.game) !== JSON.stringify(nextProps.game));
  }

  handleDelete = () => {
    const { wagerObj, deleteWager } = this.props;

    deleteWager(wagerObj.wagerId);
  };

  render() {
    const { wagerObj } = this.props;
    const { betObjs, odds, amount } = wagerObj;
    // const { game, wager } = this.props;
    // const { bets, odds, amount } = wager;
    // const betObjs = bets.map(bet => {
    //   return {
    //     side: bet.side,
    //     game: games[bet.gameId]
    //   };
    // });
    // const wagerObj = {
    //   betObjs,
    //   odds,
    //   amount
    // };

    const displayBetObjs = betObjs.map(betObj => {
      const { side, game } = betObj;
      const awayScore = game['away'] || '-';
      const homeScore = game['home'] || '-';
      const dateTime = game['date-time'] || '-';

      const gameStarted = (document.getElementById(game.id).classList.contains('live') ||
        document.getElementById(game.id).classList.contains('final')) &&
        document.getElementById(game.id).getElementsByClassName('date-time')[0]
          .innerText !== 'POSTPONED';

      let teamWinP = 50;

      if (gameStarted && dateTime !== "Delayed" && dateTime !== "POSTPONED" &&
        awayScore !== '-' && homeScore !== '-' && dateTime !== '-') {
        const homeWinP = calcHomeSpreadWinP(parseInt(awayScore), parseInt(homeScore), dateTime);
        teamWinP = side === game.homeTeam ? homeWinP : Math.round((100 - homeWinP) * 100) / 100;
      }

      return {
        gameStarted,
        game,
        side,
        teamWinP
      }
    });
    // const awayScore = game['away'] || '-';
    // const homeScore = game['home'] || '-';
    // const dateTime = game['date-time'] || '-';
    //
    // const gameStarted = (document.getElementById(game.id).classList.contains('live') ||
    //   document.getElementById(game.id).classList.contains('final')) &&
    //   document.getElementById(game.id).getElementsByClassName('date-time')[0]
    //     .innerText !== 'POSTPONED';
    //
    // let wagerValue = 0;
    // let teamWinP = '';

    // const wagerValue = calcWagerValue(wagerObj);
    const wagerValue = 0;


    const prefix = wagerValue === 0 ? '$' : wagerValue > 0 ? '+$' : '-$';
    const displayVal = wagerValue === parseInt(wagerValue) ?
      Math.abs(wagerValue) : Math.abs(wagerValue).toFixed(2);

    return (
      <li className={ style.normal }>
        <div className={ style.wagerItemHeader } >
          <div className={ style.wagerItemHeaderRow } >
            <span>
              { odds > 0 ? '+' + odds : odds }
            </span>
            <span>$
              { amount }
            </span>
            <span>
              { prefix + displayVal }
            </span>
            <button
              className={ style.destroy }
              onClick={ this.handleDelete }
            />
          </div>
          <div>
            {
              displayBetObjs.map((displayBetObj, idx) =>
                <div key={ idx } >
                  <div className={ style.wagerItemHeaderRow } >
                    <span>
                      { displayBetObj.side }
                    </span>
                  </div>
                  <label>
                    <div>
                      <div>
                        { displayBetObj.game.awayTeam }
                      </div>
                      <div>
                        { displayBetObj.game.homeTeam }
                      </div>
                    </div>

                    <div>
                      { displayBetObj.gameStarted &&
                      <div>
                        <div>
                          { displayBetObj.game.away || '-' }
                        </div>
                        <div>
                          { displayBetObj.game.home || '-' }
                        </div>
                      </div>
                      }
                    </div>

                    <div>
                      { displayBetObj.gameStarted &&
                      <div>
                        <div>
                          { displayBetObj.game['date-time'] || '-' }
                        </div>
                        <div>
                          { displayBetObj.teamWinP + '%' }
                        </div>
                      </div>
                      }
                    </div>
                  </label>

                </div>
              )
            }
          </div>
        </div>
      </li>
    );
  }
}